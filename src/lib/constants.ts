/**
 * ============================================================================
 *  ALAN ONYMOUS — SITE CONTENT
 *  Almost everything you'd want to change on the website lives in this file.
 *  Edit a value, commit, and the site redeploys automatically.
 * ============================================================================
 */

/** Band name, shown as the big header and in the browser tab. */
export const BAND_NAME = 'Alan Onymous';

/** The site's public address (no trailing slash). Used for link previews. */
export const SITE_URL = 'https://www.alanonymo.us';

/** One-line description used by Google and link previews (Instagram, iMessage…). */
export const SITE_DESCRIPTION =
  'Alan Onymous — darkwave/alternative from San Francisco. Debut album ALLOW ALL, mixed by Jorge Elbrecht, arrives early 2027.';

/**
 * Biographical text for the band. Separate paragraphs with a blank line
 * (two newlines).
 */
export const BIO_TEXT = `Alan Onymous is an emerging darkwave/alternative project that grapples with the consequences of peering beneath the surface of identity, artificial intelligence, and human nature.

Debut album ALLOW ALL is set for release in early 2027. Mixed by Jorge Elbrecht, it is rife with multiple meanings and spans across genres.

Formed by members of San Francisco acts Your Fearless Leader, Embrium, and Mitch Rocket, Alan Onymous brings a live show that uses electronic drums and keys, baritone guitar, and live vocals and drums to paint with a wide range of sonic colors that reach into every level of consciousness.`;

/** Alt text for the band photo (describe what's in it, for screen readers). */
export const BAND_PHOTO_ALT =
  'The four members of Alan Onymous, eyes hidden behind black bars and a silver mask, posed among classical columns and a bust under red light';

/**
 * Text content and destination URL. Use these values to display an
 * attention-grabbing announcement toast on the website with an optional link.
 *
 * If ANNOUNCEMENT_TEXT is empty, no announcement will appear. If
 * ANNOUNCEMENT_ACTION_TEXT or ANNOUNCEMENT_URL is empty, the announcement will
 * appear without a link.
 *
 * @example
 * export const ANNOUNCEMENT_TEXT = 'New single out Friday';
 * export const ANNOUNCEMENT_ACTION_TEXT = 'PRE-SAVE';
 * export const ANNOUNCEMENT_URL = 'https://example.com';
 */
export const ANNOUNCEMENT_TEXT = '';
export const ANNOUNCEMENT_ACTION_TEXT = '';
export const ANNOUNCEMENT_URL = '';

/**
 * Shows. Add one entry per show, in any order. Upcoming shows appear under
 * "Shows" (soonest first); once a date passes, the show moves to "Past shows"
 * automatically (most recent first). Each section hides when it's empty.
 *
 * `date` must be YYYY-MM-DD. `ticketUrl` and `lineup` are optional.
 * Ticket buttons only appear on upcoming shows.
 *
 * @example
 * { date: '2026-12-05', venue: 'The Chapel', city: 'San Francisco, CA', lineup: 'w/ Band A, Band B', ticketUrl: 'https://…' },
 */
export const SHOWS: Show[] = [
  {
    date: '2026-06-24',
    venue: 'Kilowatt',
    city: 'San Francisco, CA',
    lineup: 'w/ Sof Dolo, Sofia RB',
    ticketUrl:
      'https://dice.fm/event/bbob8k-sof-dolo-alan-onymous-and-sofia-rb-24th-jun-kilowatt-san-francisco-tickets',
  },
  {
    date: '2026-03-11',
    venue: 'The Knockout',
    city: 'San Francisco, CA',
    lineup: 'w/ Clumsy Tungs (record release), Bad Decade, Filling',
  },
  {
    date: '2025-11-13',
    venue: 'Mabuhay Gardens',
    city: 'San Francisco, CA',
    lineup: 'w/ Toothache, Rose Haze',
    ticketUrl:
      'https://www.eventbrite.com/e/toothache-alan-onymous-rose-haze-the-fab-mab-tickets-1936951707699',
  },
];

/**
 * Spotify embedded player URL. In Spotify: Share → Embed → copy, then keep only
 * the `src="…"` value. Leave empty to hide the player.
 */
export const SPOTIFY_EMBED_URL =
  'https://open.spotify.com/embed/artist/6nzeqJpWwbzBRb12gE3Vvp?utm_source=generator&theme=0';

/**
 * YouTube embedded player URL. On YouTube: Share → Embed → copy, then keep only
 * the `src="…"` value. Leave empty to hide the video.
 */
export const YOUTUBE_EMBED_URL = '';

/**
 * Links shown at the bottom of the page. Entries with an empty `url` are
 * hidden. Reorder freely.
 */
export const SOCIAL_LINKS: { label: string; url: string }[] = [
  { label: 'Instagram', url: 'https://www.instagram.com/alan_onymous/' },
  {
    label: 'Spotify',
    url: 'https://open.spotify.com/artist/6nzeqJpWwbzBRb12gE3Vvp',
  },
  { label: 'Bandcamp', url: 'https://alanonymous.bandcamp.com' },
  { label: 'YouTube', url: '' },
  { label: 'Email', url: 'mailto:alan0nymous@proton.me' },
];

export type Show = {
  date: string;
  venue: string;
  city: string;
  lineup?: string;
  ticketUrl?: string;
};
