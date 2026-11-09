import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { BAND_NAME, BOOKING_EMAIL, BOOKING_FROM } from '$lib/constants';
import type { Actions } from './$types';

const MAX = { name: 120, email: 200, short: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Reject submissions faster than a human could fill the form.
const MIN_FILL_MS = 3000;

function field(data: FormData, key: string, max: number) {
  return String(data.get(key) ?? '')
    .trim()
    .slice(0, max);
}

export const actions: Actions = {
  subscribe: async ({ request }) => {
    const data = await request.formData();
    const email = field(data, 'email', MAX.email).toLowerCase();

    // Same spam checks as the booking form.
    const honeypot = field(data, 'website', 200);
    const startedAt = Number(data.get('started_at') ?? 0);
    if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
      return { subscribe: { success: true } };
    }

    if (!EMAIL_RE.test(email)) {
      return fail(400, {
        subscribe: { email, error: 'Enter a valid email.' },
      });
    }

    // Adding contacts needs a Full-access key. Keep it separate so the
    // booking form's key can stay sending-only.
    const apiKey = env.RESEND_CONTACTS_API_KEY;
    if (!apiKey) {
      console.error('RESEND_CONTACTS_API_KEY is not set');
      return fail(500, { subscribe: { email, error: 'failed' } });
    }

    // Optional: put new subscribers in a specific Resend segment.
    const segmentId = env.RESEND_SEGMENT_ID;

    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      // Already on the list counts as success.
      if (res.status === 409 || /already exist/i.test(body)) {
        return { subscribe: { success: true } };
      }
      console.error('Resend contacts error', res.status, body);
      return fail(502, { subscribe: { email, error: 'failed' } });
    }

    return { subscribe: { success: true } };
  },

  booking: async ({ request }) => {
    const data = await request.formData();

    const values = {
      name: field(data, 'name', MAX.name),
      email: field(data, 'email', MAX.email),
      dates: field(data, 'dates', MAX.short),
      message: field(data, 'message', MAX.message),
    };

    // Spam checks: hidden honeypot field must stay empty, and the form must
    // not be submitted instantly. Pretend success so bots learn nothing.
    const honeypot = field(data, 'website', 200);
    const startedAt = Number(data.get('started_at') ?? 0);
    if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
      return { success: true };
    }

    const errors: Record<string, string> = {};
    if (!values.name) errors.name = 'Enter your name.';
    if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email.';
    if (!values.message) errors.message = 'Tell us a little about the event.';
    if (Object.keys(errors).length) {
      return fail(400, { values, errors });
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return fail(500, { values, errors: { form: 'send_failed' } });
    }

    const text = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Date(s): ${values.dates || '—'}`,
      '',
      values.message,
      '',
      '— Sent from the booking form on alanonymo.us',
    ].join('\n');

    const subjectBits = [values.dates].filter(Boolean);
    const subject = `Booking: ${values.name}${
      subjectBits.length ? ` — ${subjectBits.join(', ')}` : ''
    }`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${BAND_NAME} Booking <${BOOKING_FROM}>`,
        to: [BOOKING_EMAIL],
        reply_to: values.email,
        subject: subject.slice(0, 200),
        text,
      }),
    });

    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      return fail(502, { values, errors: { form: 'send_failed' } });
    }

    return { success: true };
  },
};
