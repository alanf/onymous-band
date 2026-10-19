<script lang="ts">
  import { SHOWS } from '$lib/constants';

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = SHOWS.filter((show) => show.date >= today).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  function formatDate(iso: string) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
</script>

{#if upcoming.length}
  <section aria-labelledby="shows-heading">
    <h2 id="shows-heading">Shows</h2>
    <ul>
      {#each upcoming as show}
        <li>
          <span class="date">{formatDate(show.date)}</span>
          <span class="where">
            <span class="venue">{show.venue}</span>
            <span class="city">{show.city}</span>
          </span>
          {#if show.ticketUrl}
            <a href={show.ticketUrl} rel="noreferrer" target="_blank">Tickets</a
            >
          {/if}
        </li>
      {/each}
    </ul>
  </section>
{/if}

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

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    align-items: center;
    border-top: 1px solid var(--line);
    display: flex;
    gap: 16px;
    padding: 16px 0;
  }

  li:last-child {
    border-bottom: 1px solid var(--line);
  }

  .date {
    font-weight: 600;
    min-width: 110px;
  }

  .where {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .city {
    color: var(--muted);
    font-size: 14px;
  }

  a {
    border: 1px solid var(--accent);
    border-radius: 999px;
    color: var(--accent);
    font-size: 14px;
    font-weight: 600;
    padding: 6px 14px;
    text-decoration: none;
    white-space: nowrap;
  }

  a:hover {
    background: var(--accent);
    color: var(--bg);
  }

  @media (max-width: 480px) {
    li {
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .date {
      min-width: 0;
      width: 100%;
    }
  }
</style>
