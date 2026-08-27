# Siddhesh Khankhoje — Portfolio

Personal portfolio site, built to be the strongest and most professional showcase of my work for internships and placements. Black-and-white base with an electric blue accent, bold editorial type, sharp geometric UI, and a car-themed interactive section — no generic AI-template look.

**Live:** _add deployed URL_

## Tech Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Motion (Framer Motion for React)
- **Scroll:** Lenis (smooth scroll)
- **Icons:** Lucide React
- **UI primitives:** shadcn/ui (used selectively)
- **Deployment:** Vercel
- Server Components by default, no backend unless a feature specifically needs one

## Sections

- Floating navbar — `SID / WORK / ABOUT / LAB / CONTACT`
- Hero
- Selected Work — project case studies at `/work/[slug]`
- About
- Experience / capabilities
- Lab — experiments
- **Drive** — signature scroll-driven SVG car animation
- Contact
- Optional `Cmd/Ctrl+K` command palette (Work / About / Lab / Contact / GitHub / Email)

## Featured Projects

- **LawTalk** — RAG-based legal assistant. FastAPI backend, Groq API, Supabase (auth + chat history), FAISS vector store.
- **Time Series Energy Prediction** — Deep learning energy forecasting (RNN/LSTM/Transformer) in Python with TensorFlow/Keras and PyTorch; evaluated on MSE, RMSE, MAE, MAPE, R².
- **Bank Loan Default Prediction** — Flask app using Random Forest and XGBoost on the German Credit dataset.
- **Slipstream** — Automotive website built with HTML/CSS/Tailwind/JS, deployed on Netlify.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Project Structure

```
src/        # app routes, components, lib
public/     # static assets
```

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` deploy automatically.

## License

_Personal project — all rights reserved unless stated otherwise._