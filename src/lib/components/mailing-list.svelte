<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { MAILING_LIST_TEXT } from '$lib/constants';

  type SubscribeState = {
    success?: boolean;
    email?: string;
    error?: string;
  };

  /** Result of the `?/subscribe` form action, passed down from the page. */
  export let state: SubscribeState | undefined = undefined;

  let startedAt = '';
  let sending = false;

  onMount(() => {
    startedAt = String(Date.now());
  });

  $: error = state?.error;
</script>

<section id="mailing-list" aria-labelledby="mailing-list-heading">
  <h2 id="mailing-list-heading">Mailing list</h2>

  {#if state?.success}
    <p class="notice" role="status">You're on the list. See you at a show.</p>
  {:else}
    <p>{MAILING_LIST_TEXT}</p>

    <form
      method="POST"
      action="?/subscribe#mailing-list"
      use:enhance={() => {
        sending = true;
        return async ({ update }) => {
          await update({ reset: false });
          sending = false;
        };
      }}
      novalidate
    >
      <div class="row">
        <label>
          <span class="sr-only">Email</span>
          <input
            name="email"
            type="email"
            autocomplete="email"
            required
            maxlength="200"
            placeholder="you@example.com"
            value={state?.email ?? ''}
            aria-invalid={Boolean(error)}
          />
        </label>
        <button type="submit" disabled={sending}>
          {sending ? 'Joining…' : 'Join'}
        </button>
      </div>

      {#if error === 'failed'}
        <small role="alert">Something went wrong. Please try again later.</small
        >
      {:else if error}
        <small role="alert">{error}</small>
      {/if}

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
    </form>
  {/if}
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

  .row {
    display: flex;
    gap: 10px;
  }

  label {
    display: flex;
    flex: 1;
    min-width: 0;
  }

  input {
    background: rgba(243, 241, 236, 0.04);
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--fg);
    flex: 1;
    font: inherit;
    font-size: 16px;
    min-width: 0;
    padding: 10px 16px;
  }

  input:focus,
  [aria-invalid='true'] {
    border-color: var(--accent);
    outline: none;
  }

  ::placeholder {
    color: var(--muted);
    opacity: 0.6;
  }

  button {
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

  button:hover {
    filter: brightness(1.1);
  }

  button:disabled {
    cursor: progress;
    opacity: 0.7;
  }

  small {
    color: var(--accent);
    display: block;
    font-size: 13px;
    margin-top: 8px;
  }

  .notice {
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 14px 16px;
  }

  .trap {
    height: 0;
    left: -9999px;
    overflow: hidden;
    position: absolute;
    width: 0;
  }

  .sr-only {
    clip: rect(0 0 0 0);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
</style>
