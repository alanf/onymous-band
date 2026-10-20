<script lang="ts">
  import { SHOWS, type Show } from '$lib/constants';

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = SHOWS.filter((show) => show.date >= today).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const past = SHOWS.filter((show) => show.date < today).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  function formatDate(iso: string, withYear: boolean) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: withYear ? undefined : 'short',
      month: 'short',
      day: 'numeric',
      year: withYear ? 'numeric' : undefined,
    });
  }

  const sections: {
    id: string;
    title: string;
    shows: Show[];
    isPast: boolean;
  }[] = [
    { id: 'shows', title: 'Shows', shows: upcoming, isPast: false },
    { id: 'past-shows', title: 'Past shows', shows: past, isPast: true },
  ];
</script>

{#each sections as section}
  {#if section.shows.length}
    <section
      aria-labelledby={`${section.id}-heading`}
      class:past={section.isPast}
    >
      <h2 id={`${section.id}-heading`}>{section.title}</h2>
      <ul>
        {#each section.shows as show}
          <li>
            <span class="date">{formatDate(show.date, section.isPast)}</span>
            <span class="where">
              <span class="venue">{show.venue}</span>
              <span class="city">{show.city}</span>
              {#if show.lineup}<span class="lineup">{show.lineup}</span>{/if}
            </span>
            {#if show.ticketUrl && !section.isPast}
              <a href={show.ticketUrl} rel="noreferrer" target="_blank"
                >Tickets</a
              >
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  {/if}
{/each}

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

  .past h2 {
    color: var(--muted);
    font-size: 20px;
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

  .past li {
    align-items: flex-start;
    padding: 12px 0;
  }

  .date {
    font-weight: 600;
    min-width: 120px;
  }

  .past .date {
    color: var(--muted);
    font-weight: 400;
  }

  .where {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .city,
  .lineup {
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
