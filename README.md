# Glycemic Treatment Navigator

Next.js 14 + TypeScript + Tailwind app built from **ADA Standards of Care in Diabetes 2026, Section 9** (Diabetes Care 2026;49(Suppl. 1):S183–S215).

- **Treatment advisor**: profile (type, A1C vs goal, eGFR, ASCVD, HF, CKD, MASLD, obesity, hypoglycemia risk, cost, special circumstances) gives a disease category and recommended / consider / avoid / monitor items, each tagged with its ADA recommendation number (`lib/engine.ts`).
- **Learn**: separate medication and insulin modules plus a starting-dose estimator.
- **Knowledge base**: searchable recommendations 9.1–9.39 and a drug-feature table (`lib/kb.ts`).

## Knowledge-base document
Keep the source PDF at `docs/dc26s009.pdf`. ADA's licence limits posting on third-party sites without permission, so keep this repo **private** (or omit the PDF). The app ships only a paraphrased summary.

## Run
```
npm install
npm run dev
```
## Deploy
Push to GitHub, import the repo in Vercel (framework auto-detected; region bom1 set in `vercel.json`).

Decision support only; not a substitute for clinical judgment.
