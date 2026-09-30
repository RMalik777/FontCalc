# FontCalc

FontCalc is a calculator for modular type scales. You select a ratio and a base size. FontCalc then calculates the font size of each step in the scale and shows a preview of each step. You can copy the result as CSS.

Live site: [font.raflimalik.com](https://font.raflimalik.com)

## Features

- Ratio presets from "Minor second" (1.067) to "Octave" (2), and a custom ratio
- Output in `px` or `rem`
- Step names as numbers (`--step-0`, `--step-1`) or as HTML tags (`h1` to `small`)
- Buttons to add or remove steps at the two ends of the scale
- Values rounded to a set number of decimals
- A preview at the actual size, with your sample text
- A typeface selector with all the families from Google Fonts
- A `Copy CSS` button
- Light and dark themes

The browser keeps your selected typeface for the next visit.

## Technology

- [SvelteKit](https://svelte.dev/docs/kit) and Svelte 5
- [shadcn-svelte](https://www.shadcn-svelte.com) and Tailwind CSS 4
- [TanStack Query](https://tanstack.com/query) for the font list
- [Shiki](https://shiki.style) for the CSS output
- [Vitest](https://vitest.dev) for tests
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) for the hosting

## Requirements

- Node.js 24 or a more recent version
- pnpm 12 (the `packageManager` field in `package.json` gives the version)
- A Google Fonts Developer API key. Refer to [Google Fonts Developer API](https://developers.google.com/fonts/docs/developer_api) to get a key.

## Get started

1. Clone the repository:

   ```bash
   git clone https://github.com/RMalik777/FontCalc.git
   cd FontCalc
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Copy `.env.example` to `.env`.
4. In `.env`, set `GOOGLE_FONT_API_KEY` to your API key.
5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open the URL that the terminal shows.

> [!CAUTION]
> Do not commit the `.env` file. The file contains your API key. Git ignores `.env` because `.gitignore` contains it.

## Scripts

| Script         | Result                                             |
| -------------- | -------------------------------------------------- |
| `pnpm dev`     | Starts the development server.                     |
| `pnpm build`   | Makes the production build.                        |
| `pnpm preview` | Makes the build and runs it locally with Wrangler. |
| `pnpm check`   | Does a type check of the project.                  |
| `pnpm test`    | Runs the tests.                                    |
| `pnpm lint`    | Examines the format and the code style.            |
| `pnpm format`  | Formats all the files with Prettier.               |
| `pnpm deploy`  | Makes the build and deploys it to Cloudflare.      |

## How the font list operates

The app does not send the API key to the browser. The key stays on the server:

1. During the build, `src/routes/fonts.json/+server.ts` gets the list of families from the Google Fonts Developer API.
2. SvelteKit prerenders this list as the static file `/fonts.json`.
3. When a user opens the typeface selector, the browser loads `/fonts.json` one time.

Thus the list changes only when you build the site again. The build does not complete if the API key is missing or incorrect.

## Project structure

| Path                         | Contents                                             |
| ---------------------------- | ---------------------------------------------------- |
| `src/routes/`                | The page, the layout, and the `/fonts.json` endpoint |
| `src/lib/scale.svelte.ts`    | The scale state and the calculation                  |
| `src/lib/fonts.ts`           | The font list query, the search, and the storage     |
| `src/lib/server/`            | Code that runs only on the server                    |
| `src/lib/components/`        | The app components                                   |
| `src/lib/components/ui/`     | The shadcn-svelte components                         |
| `src/lib/constant/config.ts` | The ratios, the units, and the default values        |
| `src/test/`                  | The tests                                            |

Some files in `src/lib/components/ui/` have local changes. The `shadcn-svelte update` command replaces these files. After an update, examine the changes with `git diff`.

## Deploy

The project uses `@sveltejs/adapter-cloudflare` and deploys to Cloudflare Workers.

1. Log in to Cloudflare:

   ```bash
   pnpm wrangler login
   ```

2. Deploy the site:

   ```bash
   pnpm deploy
   ```

If you use Cloudflare Workers Builds, add `GOOGLE_FONT_API_KEY` as a build variable. The build uses the key, but the Worker does not.

## License

MIT. Refer to the [LICENSE](LICENSE) file.
