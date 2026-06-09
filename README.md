# Grainly Icons

![alt text](/public/image.png)

Collection of icons, that are made up of grids.


## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production app
- `npm run start` — start the production server after build
- `npm run registry:build` — build the icon registry JSON from `icons/`

## Project Structure

- `app/` — main Next.js app pages and layout
- `components/` — reusable UI components
- `icons/` — icon components used by the app
- `public/r/` — generated icon registry JSON files
- `scripts/build-registry.ts` — registry generation script
- `utils/` — shared utility components

## Notes

- The main entry point is `app/page.tsx`.
- The project has a custom icon registry; run `npm run registry:build` after adding or updating icons.
- Tailwind CSS is configured through `postcss.config.mjs` and `globals.css`.

