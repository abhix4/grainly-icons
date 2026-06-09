# Grainly Icons

![alt text](/public/image.png)

Grainly Icons is a modern Next.js app built with React 19 and Tailwind CSS v4. It includes a custom icon registry system and a component-driven icon library under `icons/` and `components/`.

## Key Features

- Next.js 16 application with the App Router
- React 19 and Tailwind CSS v4 styling
- Custom icon components in `icons/`
- Generated icon registry with `scripts/build-registry.ts`
- Bundled app content under `app/` and reusable UI components under `components/`

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

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production app
- `npm run start` — start the production server after build
- `npm run lint` — run ESLint
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

## Learn More

This repository is based on a standard Next.js starter structure. For more details on Next.js, Tailwind CSS, and TypeScript:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
