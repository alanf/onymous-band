# Alan Onymous

Source code for the Alan Onymous band website.

## Making basic content changes

Everything you'll usually want to edit — bio, shows, links, embeds,
announcement banner — is in
[`src/lib/constants.ts`](src/lib/constants.ts).

1. Open `src/lib/constants.ts` on GitHub and select the pencil icon (`Edit this file`).
2. Make your changes.
3. Select `Commit changes...`, choose `Create a new branch for this commit and start a pull request`, then `Propose changes` → `Create pull request`.
4. Wait for the Vercel check (under a minute) and open its preview link. **Check it on both phone and desktop widths.**
5. Select `Merge pull request` → `Confirm merge`. The live site updates within a couple of minutes.

### Adding a show

Add a line to `SHOWS` in `constants.ts`:

```ts
{ date: '2026-12-05', venue: 'The Chapel', city: 'San Francisco, CA', ticketUrl: 'https://…' },
```

Past dates disappear automatically. If no shows are upcoming, the section hides.

### Changing the band photo

Replace `src/lib/images/band-photo.jpg` (or `.png` / `.webp`) — square works best, at least 1200 px.

## Developing

```sh
npm install
npm run dev
```

## Building

```sh
npm run build
npm run preview
```

Originally based on [jerrypopsoff/yfl-band](https://github.com/jerrypopsoff/yfl-band).
