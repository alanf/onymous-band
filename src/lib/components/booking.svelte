<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import {
    BOOKING_BODY,
    BOOKING_EMAIL,
    BOOKING_SUBJECT,
    BOOKING_TEXT,
  } from '$lib/constants';

  type FormState = {
    success?: boolean;
    values?: Record<string, string>;
    errors?: Record<string, string>;
  } | null;

  /** Result of the `?/booking` form action, passed down from the page. */
  export let form: FormState = null;

  const mailto = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(
    BOOKING_SUBJECT,
  )}&body=${encodeURIComponent(BOOKING_BODY)}`;

  let startedAt = '';
  let sending = false;
  let copied = false;
  let timer: ReturnType<typeof setTimeout>;

  onMount(() => {
    startedAt = String(Date.now());
  });

  $: values = form?.values ?? {};
  $: errors = form?.errors ?? {};

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(BOOKING_EMAIL);
    } catch {
      const input = document.createElement('input');
      input.value = BOOKING_EMAIL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 2000);
  }
</script>

<section id="booking" aria-labelledby="booking-heading">
  <h2 id="booking-heading">Booking</h2>

  {#if form?.success}
    <p class="notice" role="status">
      Thank you for the message. We will reply soon…
    </p>
  {:else}
    <p>{BOOKING_TEXT}</p>

    {#if errors.form}
      <p class="notice error" role="alert">
        Something went wrong sending your message. Please email us directly at
        <a href={mailto}>{BOOKING_EMAIL}</a>.
      </p>
    {/if}

    <form
      method="POST"
      action="?/booking#booking"
      use:enhance={() => {
        sending = true;
        return async ({ update }) => {
          await update({ reset: false });
          sending = false;
        };
      }}
      novalidate
    >
      <div class="grid">
        <label>
          <span>Name <em>*</em></span>
          <input
            name="name"
            autocomplete="name"
            required
            maxlength="120"
            value={values.name ?? ''}
            aria-invalid={Boolean(errors.name)}
          />
          {#if errors.name}<small>{errors.name}</small>{/if}
        </label>
        <label>
          <span>Email <em>*</em></span>
          <input
            name="email"
            type="email"
            autocomplete="email"
            required
            maxlength="200"
            value={values.email ?? ''}
            aria-invalid={Boolean(errors.email)}
          />
          {#if errors.email}<small>{errors.email}</small>{/if}
        </label>
        <label class="full">
          <span>Date(s)</span>
          <input
            name="dates"
            maxlength="200"
            placeholder="Fri, Feb 12"
            value={values.dates ?? ''}
          />
        </label>
      </div>

      <label>
        <span>Message <em>*</em></span>
        <textarea
          name="message"
          rows="5"
          required
          maxlength="5000"
          placeholder="Tell us your event thoughts (who, what, where, etc.)"
          aria-invalid={Boolean(errors.message)}
          >{values.message ?? ''}</textarea
        >
        {#if errors.message}<small>{errors.message}</small>{/if}
      </label>

      <!-- Spam trap: hidden from people, irresistible to bots. -->
      <div class="trap" aria-hidden="true">
        <label
          >Website <input
            name="website"
            tabindex="-1"
            autocomplete="off"
          /></label
        >
      </div>
      <input type="hidden" name="started_at" value={startedAt} />

      <button class="primary" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  {/if}

  <p class="direct">
    Or email us directly: <a href={mailto}>{BOOKING_EMAIL}</a>
    <button type="button" class="link" on:click={copyEmail} aria-live="polite">
      {copied ? 'Copied' : 'Copy'}
    </button>
  </p>
</section>

<style>
  section {
    margin: 64px 0;
    text-align: left;
  }

  h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    letter-spacing: -0.01em;
    margin: 0 0 16px;
    text-transform: uppercase;
  }

  p {
    margin: 0 0 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }
  }

  .full {
    grid-column: 1 / -1;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label > span {
    color: var(--muted);
    font-size: 14px;
  }

  em {
    color: var(--accent);
    font-style: normal;
  }

  input,
  textarea {
    background: rgba(243, 241, 236, 0.04);
    border: 1px solid var(--line);
    border-radius: 6px;
    color: var(--fg);
    font: inherit;
    font-size: 16px;
    padding: 10px 12px;
  }

  input:focus,
  textarea:focus {
    border-color: var(--accent);
    outline: none;
  }

  [aria-invalid='true'] {
    border-color: var(--accent);
  }

  textarea {
    resize: vertical;
  }

  ::placeholder {
    color: var(--muted);
    opacity: 0.6;
  }

  small {
    color: var(--accent);
    font-size: 13px;
  }

  .trap {
    height: 0;
    left: -9999px;
    overflow: hidden;
    position: absolute;
    width: 0;
  }

  .primary {
    align-self: flex-start;
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 999px;
    color: var(--fg);
    cursor: pointer;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 22px;
  }

  .primary:hover {
    filter: brightness(1.1);
  }

  .primary:disabled {
    cursor: progress;
    opacity: 0.7;
  }

  .notice {
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 14px 16px;
  }

  .notice.error {
    border-color: var(--accent);
  }

  .direct {
    color: var(--muted);
    font-size: 14px;
    margin: 24px 0 0;
  }

  .direct a,
  .notice a {
    color: var(--fg);
  }

  .link {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    margin-left: 8px;
    padding: 0;
  }
</style>
