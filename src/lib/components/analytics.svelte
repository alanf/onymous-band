<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { GTAG_MEASUREMENT_ID } from '$lib/constants';

  type GtagWindow = Window & { dataLayer: unknown[] };

  onMount(() => {
    if (dev || !GTAG_MEASUREMENT_ID) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    const w = window as unknown as GtagWindow;
    w.dataLayer = w.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    const gtag = function () {
      w.dataLayer.push(arguments);
    };
    // @ts-expect-error gtag takes variadic args via `arguments`
    gtag('js', new Date());
    // @ts-expect-error see above
    gtag('config', GTAG_MEASUREMENT_ID);
  });
</script>
