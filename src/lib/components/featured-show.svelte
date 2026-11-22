<script lang="ts">
  import type { FeaturedShow } from '$lib/constants';

  export let show: FeaturedShow;

  const [y, m, d] = show.date.split('-').map(Number);
  const when = new Date(y, m - 1, d);
  const weekday = when.toLocaleDateString('en-US', { weekday: 'short' });
  const month = when.toLocaleDateString('en-US', { month: 'short' });
</script>

<section class="section card" aria-labelledby="featured-show-heading">
  <div class="date" aria-hidden="true">
    <span class="weekday">{weekday}</span>
    <span class="day">{d}</span>
    <span class="month">{month}</span>
  </div>
  <div class="info">
    <p class="kicker">{show.label}</p>
    <h2 id="featured-show-heading">
      {show.venue}<span class="city">&nbsp;·&nbsp;{show.city}</span>
    </h2>
    <p class="meta">
      <span class="sr-only">{weekday}, {month} {d}, {y}. </span>
      {[show.time, show.lineup].filter(Boolean).join(' · ')}
    </p>
    {#if show.details}<p class="details">{show.details}</p>{/if}
    <a class="button" href={show.ticketUrl} rel="noreferrer" target="_blank"
      >Get tickets</a
    >
  </div>
</section>

<style>
  /* The one boxed element on the page: the show people should buy into. */
  .card {
    align-items: center;
    border: 1px solid var(--line);
    border-left: 4px solid var(--accent);
    border-radius: 4px;
    display: flex;
    gap: 24px;
    margin-top: 24px;
    padding: 24px;
  }

  .date {
    display: flex;
    flex-direction: column;
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1;
    min-width: 72px;
    text-align: center;
    text-transform: uppercase;
  }

  .weekday,
  .month {
    color: var(--accent);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .day {
    font-size: 56px;
    font-weight: 700;
    letter-spacing: -0.04em;
    margin: 4px 0;
  }

  .info {
    flex: 1;
    min-width: 0;
  }

  h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    letter-spacing: -0.01em;
    line-height: 1.1;
    margin: 0 0 8px;
    text-transform: uppercase;
  }

  .city {
    color: var(--muted);
    font-size: 0.6em;
    letter-spacing: 0;
  }

  .meta,
  .details {
    font-size: 15px;
    margin: 0;
  }

  .details {
    color: var(--muted);
  }

  .button {
    margin-top: 16px;
  }

  @media (max-width: 520px) {
    .card {
      gap: 16px;
      padding: 20px 16px;
    }
    .date {
      min-width: 56px;
    }
    .day {
      font-size: 44px;
    }
    h2 {
      font-size: 24px;
    }
    .button {
      display: flex;
    }
  }
</style>
