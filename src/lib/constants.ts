/**
 * ============================================================================
 *  ALAN ONYMOUS — SITE CONTENT
 *  Almost everything you'd want to change on the website lives in this file.
 *  Edit a value, commit, and the site redeploys automatically.
 * ============================================================================
 */

/** Band name, shown as the big header and in the browser tab. */
export const BAND_NAME = 'Alan Onymous';

/** One-line description used by Google and link previews (Instagram, iMessage…). */
export const SITE_DESCRIPTION =
  'Alan Onymous — official website. Music, videos, and upcoming shows.';

/**
 * Biographical text for the band. Separate paragraphs with a blank line
 * (two newlines).
 */
export const BIO_TEXT = `[PLACEHOLDER BIO] Alan Onymous is a band. Replace this with two or three sentences about who you are, where you're from, and what you sound like.`;

/** Alt text for the band photo (describe what's in it, for screen readers). */
export const BAND_PHOTO_ALT = 'Photograph of Alan Onymous band members';

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
 * Upcoming shows. Add one line per show; past shows (by date) are hidden
 * automatically, and if there are none the section disappears.
 * `date` must be YYYY-MM-DD. `ticketUrl` is optional.
 *
 * @example
 * { date: '2026-12-05', venue: 'The Chapel', city: 'San Francisco, CA', ticketUrl: 'https://…' },
 */
export const SHOWS: Show[] = [
  // { date: '2026-12-05', venue: 'Venue Name', city: 'City, ST', ticketUrl: '' },
];

/**
 * Spotify embedded player URL. In Spotify: Share → Embed → copy, then keep only
 * the `src="…"` value. Leave empty to hide the player.
 */
export const SPOTIFY_EMBED_URL = '';

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
  { label: 'Instagram', url: '' },
  { label: 'Spotify', url: '' },
  { label: 'YouTube', url: '' },
  { label: 'Bandcamp', url: '' },
  { label: 'Email', url: '' }, // e.g. 'mailto:booking@example.com'
];

/** Google Analytics 4 measurement ID (G-XXXXXXX). Empty = no analytics. */
export const GTAG_MEASUREMENT_ID = '';

export type Show = {
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
};
