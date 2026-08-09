# Ecom Seller Tools

Free calculators for e-commerce sellers — eBay fees, Amazon fees, profit, ROI,
profit margin, shipping cost and currency conversion. No login, no database,
no payment system. Every calculation runs in the browser.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and React.

## Project structure

```
ecom-seller-tools/
├── app/                        Routes (App Router)
│   ├── layout.tsx               Root layout: fonts, header, footer
│   ├── page.tsx                 Homepage
│   ├── globals.css              Tailwind + design tokens
│   ├── all-calculators/         /all-calculators
│   ├── ebay-fee-calculator/     /ebay-fee-calculator
│   ├── amazon-fee-calculator/   /amazon-fee-calculator
│   ├── profit-calculator/       /profit-calculator
│   ├── roi-calculator/          /roi-calculator
│   ├── profit-margin-calculator/ /profit-margin-calculator
│   ├── shipping-calculator/     /shipping-calculator
│   ├── currency-calculator/     /currency-calculator
│   ├── about/  contact/  privacy-policy/  terms-of-use/
│   └── not-found.tsx
├── components/
│   ├── Header.tsx, Footer.tsx, Container.tsx
│   ├── Hero.tsx, HeroPreview.tsx        Homepage hero + live demo
│   ├── CalculatorExplorer.tsx           Search box + calculator grid
│   ├── CalculatorCategories.tsx, HowItWorks.tsx, FAQ.tsx
│   ├── CalculatorCard.tsx               Card used in grids
│   ├── CalculatorShell.tsx              Shared calculator page layout
│   ├── FormField.tsx, Button.tsx        Form primitives
│   ├── ReceiptResult.tsx                Itemized "receipt" result card
│   └── calculators/                     One client component per calculator
│       ├── EbayFeeCalculator.tsx
│       ├── AmazonFeeCalculator.tsx
│       ├── ProfitCalculator.tsx
│       ├── RoiCalculator.tsx
│       ├── ProfitMarginCalculator.tsx
│       ├── ShippingCalculator.tsx
│       └── CurrencyCalculator.tsx
├── lib/
│   ├── calculators.ts    Metadata for every calculator (name, description, url)
│   ├── currency.ts       Static reference exchange rates (swap for a live API later)
│   ├── format.ts         Number/currency/percent formatting + input parsing
│   └── site.ts           Site name, tagline, description, URL
├── types/index.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── postcss.config.mjs
```

## 1–4. Create the project and files

The full project is already generated in this folder — you don't need to
create the files by hand. Just download/copy this whole `ecom-seller-tools`
folder to your computer.

If you ever want to start a fresh Next.js project from scratch instead:

```bash
npx create-next-app@14 ecom-seller-tools --typescript --tailwind --app
```

...then copy the `app/`, `components/`, `lib/` and `types/` folders from this
project over the generated ones.

## 5. Install dependencies

Open a terminal in the `ecom-seller-tools` folder and run:

```bash
npm install
```

This downloads Next.js, React, Tailwind and TypeScript into `node_modules`.

## 6. Run the website locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.
The homepage, search, and all seven calculators are live at this point.

## 7. Build for production

```bash
npm run build
npm run start
```

`npm run build` compiles an optimized production build. `npm run start`
serves that build locally so you can double check it before deploying.

## 8. Deploy to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
vercel
```

Follow the prompts (log in, confirm the project settings, deploy). Vercel
will detect it's a Next.js app automatically.

**Option B — Git + Vercel dashboard**

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com](https://vercel.com), click **Add New → Project**.
3. Import the repository. Vercel auto-detects Next.js — no config needed.
4. Click **Deploy**.

Before going live, open `lib/site.ts` and replace the placeholder `url`
with your real production domain, and add real contact details on the
`/contact` page (a placeholder is there so nothing fake gets published).

## Notes

- **Currency rates** (`lib/currency.ts`) are static reference numbers for
  calculation purposes, not live market rates — this is disclosed on the
  currency calculator page. Swap `usdReferenceRates` for a call to a live
  exchange-rate API when you're ready; every function already reads from
  that one object.
- **Marketplace fees** entered into the eBay and Amazon calculators are
  numbers you provide — the site doesn't hard-code current fee percentages,
  since those change by seller, category and location.
