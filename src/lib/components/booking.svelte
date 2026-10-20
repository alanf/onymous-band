<script lang="ts">
  import {
    BOOKING_BODY,
    BOOKING_EMAIL,
    BOOKING_SUBJECT,
    BOOKING_TEXT,
  } from '$lib/constants';

  const mailto = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(
    BOOKING_SUBJECT,
  )}&body=${encodeURIComponent(BOOKING_BODY)}`;

  let copied = false;
  let timer: ReturnType<typeof setTimeout>;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(BOOKING_EMAIL);
    } catch {
      // Older browsers: fall back to selecting a hidden input.
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
  <p>{BOOKING_TEXT}</p>
  <p class="email">{BOOKING_EMAIL}</p>
  <div class="actions">
    <a class="primary" href={mailto}>Email us</a>
    <button type="button" on:click={copyEmail} aria-live="polite">
      {copied ? 'Copied' : 'Copy address'}
    </button>
  </div>
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
    margin: 0 0 8px;
  }

  .email {
    color: var(--muted);
    font-size: 15px;
    margin-bottom: 20px;
    word-break: break-all;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  a,
  button {
    border: 1px solid var(--accent);
    border-radius: 999px;
    cursor: pointer;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 20px;
    text-decoration: none;
  }

  .primary {
    background: var(--accent);
    color: var(--fg);
  }

  .primary:hover {
    filter: brightness(1.1);
  }

  button {
    background: transparent;
    color: var(--accent);
  }

  button:hover {
    background: var(--accent);
    color: var(--fg);
  }
</style>
