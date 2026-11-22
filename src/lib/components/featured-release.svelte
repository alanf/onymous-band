<script lang="ts">
  import type { FeaturedRelease } from '$lib/constants';

  export let release: FeaturedRelease;
</script>

<section class="section" aria-labelledby="featured-release-heading">
  <p class="kicker">{release.label}</p>
  <h2 id="featured-release-heading" class="section-title">{release.title}</h2>
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
    <a
      class="button outline small"
      href={release.listenUrl}
      rel="noreferrer"
      target="_blank">Listen on all platforms</a
    >
  {/if}
</section>

<style>
  iframe {
    border-radius: 12px;
    display: block;
  }

  a {
    margin-top: 16px;
  }
</style>
