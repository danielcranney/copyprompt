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

## Using Placeholders in Prompts

You can make your prompts customisable by including **placeholders** in the `fullText` property of each prompt object. Placeholders are written in square brackets, like `[placeholderName]`.

When a prompt contains one or more placeholders, the app will automatically generate input fields for each unique placeholder. Users can fill in these fields, and the values will be inserted into the prompt when they copy it.

**Example:**

```js
{
  title: "Career Coach",
  fullText: `Help the user improve their [careerDocument] for a [jobType] position.`
}
```

In this example, the modal will show two input fields: one for `careerDocument` and one for `jobType`. If the user enters "resume" and "developer", the copied prompt will read: **Help the user improve their resume for a developer position.**
