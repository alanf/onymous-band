<script lang="ts">
  import { onMount } from 'svelte';
  import '../styles/fonts.css';
  import '../styles/base.css';
  import EmbeddedVideo from '$lib/components/embedded-video.svelte';
  import EmbeddedAudio from '$lib/components/embedded-audio.svelte';
  import Shows from '$lib/components/shows.svelte';
  import Booking from '$lib/components/booking.svelte';
  import MailingList from '$lib/components/mailing-list.svelte';
  import Footer from '$lib/components/footer.svelte';
  import Announcement from '$lib/components/announcement.svelte';
  import FeaturedRelease from '$lib/components/featured-release.svelte';
  import FeaturedShow from '$lib/components/featured-show.svelte';
  import {
    ANNOUNCEMENT_TEXT,
    BAND_NAME,
    BAND_PHOTO_ALT,
    BIO_TEXT,
    FEATURED_RELEASE,
    FEATURED_SHOW,
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

  // Featured show hides itself once its date has passed.
  const today = new Date().toISOString().slice(0, 10);
  const featuredShow =
    FEATURED_SHOW && FEATURED_SHOW.date >= today ? FEATURED_SHOW : null;

  // Reserve space at the bottom only while the announcement banner shows.
  onMount(() => {
    document.body.classList.toggle(
      'has-announcement',
      Boolean(ANNOUNCEMENT_TEXT),
    );
  });

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
  <header>
    <h1>{BAND_NAME}</h1>
    {#if bandPhoto}
      <img alt={BAND_PHOTO_ALT} src={bandPhoto} />
    {/if}
  </header>
  {#if featuredShow}<FeaturedShow show={featuredShow} />{/if}
  {#if FEATURED_RELEASE}
    <FeaturedRelease release={FEATURED_RELEASE} />
  {:else if SPOTIFY_EMBED_URL}
    <!-- Artist player stands in when no single is featured. -->
    <EmbeddedAudio />
  {/if}
  {#if YOUTUBE_EMBED_URL}<EmbeddedVideo />{/if}
  <section class="section bio" aria-label="About">
    {#each paragraphs as paragraph}
      <p>{paragraph}</p>
    {/each}
  </section>
  <Shows />
  <MailingList
    state={form && 'subscribe' in form ? form.subscribe : undefined}
  />
  <Booking form={form && 'subscribe' in form ? null : form} />
  <Footer />
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 640px;
    padding: 56px 24px 48px;
  }

  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 96px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.9;
    margin: 0 0 32px;
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

  .bio p {
    margin: 0 0 1em;
  }

  .bio p:last-child {
    margin-bottom: 0;
  }
</style>
