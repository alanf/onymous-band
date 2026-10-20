<script lang="ts">
  import '../styles/fonts.css';
  import EmbeddedVideo from '$lib/components/embedded-video.svelte';
  import EmbeddedAudio from '$lib/components/embedded-audio.svelte';
  import Shows from '$lib/components/shows.svelte';
  import Booking from '$lib/components/booking.svelte';
  import Footer from '$lib/components/footer.svelte';
  import Announcement from '$lib/components/announcement.svelte';
  import {
    BAND_NAME,
    BAND_PHOTO_ALT,
    BIO_TEXT,
    SITE_DESCRIPTION,
    SITE_URL,
    SPOTIFY_EMBED_URL,
    YOUTUBE_EMBED_URL,
  } from '$lib/constants';

  // Drop a file named band-photo.(jpg|png|webp) into src/lib/images and it
  // shows up automatically. No photo = no image block.
  const photos = import.meta.glob(
    '$lib/images/band-photo.{jpg,jpeg,png,webp}',
    {
      eager: true,
      import: 'default',
    },
  ) as Record<string, string>;
  const bandPhoto = Object.values(photos)[0];

  /** Result of the booking form action (see +page.server.ts). */
  export let form: import('./$types').ActionData;

  const paragraphs = BIO_TEXT.split(/\n\s*\n/).filter(Boolean);
</script>

<svelte:head>
  <title>{BAND_NAME}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <meta property="og:title" content={BAND_NAME} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_URL} />
  <link rel="canonical" href={SITE_URL} />
  <meta name="twitter:card" content="summary_large_image" />
  <!-- Wide link-preview image: static/og-image.jpg (1200×630) -->
  <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={BAND_PHOTO_ALT} />
</svelte:head>

<Announcement />

<main>
  <h1>{BAND_NAME}</h1>
  {#if bandPhoto}
    <img alt={BAND_PHOTO_ALT} src={bandPhoto} />
  {/if}
  <div class="bio">
    {#each paragraphs as paragraph}
      <p>{paragraph}</p>
    {/each}
  </div>
  <Shows />
  <Booking {form} />
  {#if YOUTUBE_EMBED_URL}<EmbeddedVideo />{/if}
  {#if SPOTIFY_EMBED_URL}<EmbeddedAudio />{/if}
  <Footer />
</main>

<style>
  /* ---- Colors: tweak these to re-theme the whole site ---- */
  :global(:root) {
    --bg: #0f0f10;
    --fg: #f3f1ec;
    --muted: #9a978f;
    --accent: #e0263b;
    --line: rgba(243, 241, 236, 0.14);
  }

  :global(body) {
    background-color: var(--bg);
    color: var(--fg);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 17px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    /* Bottom margin for announcement to not block page content */
    margin: 0 0 192px 0;
    text-align: center;
  }

  :global(::selection) {
    background: var(--accent);
    color: var(--bg);
  }

  :global(:focus-visible) {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  main {
    max-width: 640px;
    margin: 48px auto;
    padding: 0 24px;
  }

  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 96px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.9;
    margin: 48px 0;
    text-transform: uppercase;

    @media (max-width: 520px) {
      font-size: 60px;
    }
  }

  img {
    aspect-ratio: 1 / 1;
    border-radius: 4px;
    display: block;
    object-fit: cover;
    width: 100%;
  }

  .bio {
    margin: 48px 0;
  }

  .bio p {
    margin: 0 0 1em;
  }
</style>
