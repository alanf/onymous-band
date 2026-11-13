<script lang="ts">
  import type { FeaturedRelease } from '$lib/constants';

  export let release: FeaturedRelease;
</script>

<section aria-labelledby="featured-release-heading">
  <p class="label">{release.label}</p>
  <h2 id="featured-release-heading">{release.title}</h2>
  <iframe
    src={release.spotifyEmbedUrl}
    width="100%"
    height="152"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    title={`Listen to ${release.title} on Spotify`}
  ></iframe>
  {#if release.listenUrl}
    <a href={release.listenUrl} rel="noreferrer" target="_blank"
      >Listen on all platforms</a
    >
  {/if}
</section>

<style>
  section {
    margin: 48px 0;
  }

  .label {
    color: var(--accent);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.12em;
    margin: 0 0 4px;
    text-transform: uppercase;
  }

  h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0 0 24px;
    text-transform: uppercase;

    @media (max-width: 520px) {
      font-size: 28px;
    }
  }

  iframe {
    border-radius: 12px;
    display: block;
  }

  a {
    border: 1px solid var(--accent);
    border-radius: 999px;
    color: var(--accent);
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    margin-top: 20px;
    padding: 8px 18px;
    text-decoration: none;
  }

  a:hover {
    background: var(--accent);
    color: var(--bg);
  }
</style>
