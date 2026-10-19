import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

// Vercel Web Analytics (enable it in the Vercel dashboard → Analytics).
injectAnalytics({ mode: dev ? 'development' : 'production' });
