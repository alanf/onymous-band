<script lang="ts">
  import { BAND_NAME, SOCIAL_LINKS } from '$lib/constants';

  const links = SOCIAL_LINKS.filter((link) => link.url);
  const year = new Date().getFullYear();
</script>

<footer>
  {#if links.length}
    <nav aria-label="Social links">
      {#each links as link}
        <a href={link.url} rel="noreferrer" target="_blank">{link.label}</a>
      {/each}
    </nav>
  {/if}
  <p>© {year} {BAND_NAME}</p>
</footer>

<style>
  footer {
    border-top: 1px solid var(--line);
    margin: var(--section-gap) 0 0;
    padding-top: 24px;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 24px;
  }

  a {
    color: var(--fg);
    font-weight: 600;
    padding: 12px 0;
    text-decoration: none;
    border-bottom: 2px solid transparent;
  }

  a:hover {
    border-bottom-color: var(--accent);
  }

  p {
    color: var(--muted);
    font-size: 13px;
    margin: 16px 0 0;
  }
</style>
