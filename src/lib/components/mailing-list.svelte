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

<section
  id="mailing-list"
  class="section"
  aria-labelledby="mailing-list-heading"
>
  <h2 id="mailing-list-heading" class="section-title">Mailing list</h2>

  {#if state?.success}
    <p class="notice" role="status">You're on the list. See you at a show.</p>
  {:else}
    <p>{MAILING_LIST_TEXT}</p>

    <form
      method="POST"
      action="?/subscribe#mailing-list"
      use:enhance={({ formData }) => {
        // Strip stray spaces (common with pasted or autofilled emails).
        formData.set('email', String(formData.get('email') ?? '').trim());
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
            on:blur={(e) =>
              (e.currentTarget.value = e.currentTarget.value.trim())}
          />
        </label>
        <button class="button" type="submit" disabled={sending}>
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
    background: var(--field);
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
</style>
