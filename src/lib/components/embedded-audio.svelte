<script>
  import { SPOTIFY_EMBED_URL } from '$lib/constants';
</script>

<div class="section">
  <iframe
    style="border-radius:12px"
    src={SPOTIFY_EMBED_URL}
    width="100%"
    height="152"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    title="Embedded Spotify audio player"
  ></iframe>
</div>
