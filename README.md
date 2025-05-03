# Copyprompt

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Adding New Prompts

To add or edit prompts in the app:

1. Open the file at `lib/prompts.ts` (or `lib/prompts.js`).
2. Each prompt is an object in the exported `prompts` array. Example:

   ```js
   {
     icon: Users,
     title: "Career Coach",
     shortText: "Roleplay as a professional career advisor.",
     fullText: `You are a professional career coach...`,
     bg: "bg-violet-300",
     hover: "hover:bg-violet-400",
     category: "Career",
   }
   ```

3. Add a new object to the array for your new prompt, or edit an existing one.
4. Save the file.
