# Siddhesh Khankhoje — Portfolio

Personal portfolio of Siddhesh Khankhoje — an AI/ML and software engineering student at SRM University, Chennai. Built with a minimalist editorial identity, fluid typography, restrained motion, and sharp geometric UI to showcase intelligent systems, physics simulations, and full-stack software products.

---

## Live

Live: Coming soon

---

## About

I build intelligent systems and software experiences at the intersection of AI/ML, computer vision, and full-stack engineering. I care about deep technical fundamentals, understanding systems from the ground up, and paying attention to the details most people skip.

Outside of engineering, my interests include motorsports (Formula 1 & Max Verstappen's precision driving), football, chess, reading, automotive physics, and meaningful conversations.

---

## Selected Work

### 01 / LawTalk
*RAG-Based AI Legal Assistant*
- A full-stack legal chatbot designed to ground responses in real statutory and case documents rather than relying on LLM memory alone, drastically mitigating hallucinations.
- **Architecture**: FastAPI backend embedding queries with Sentence Transformers, searching a FAISS vector index for legal document chunks, and generating fast grounded answers via Groq LLM API. Supabase handles authentication and persistent chat history.
- **Stack**: FastAPI, FAISS, Sentence Transformers, Groq API, Supabase, Tailwind CSS.

### 02 / QuickSign
*Real-Time Sign Language Detection*
- A computer vision web application that recognizes English sign-language alphabet gestures live from a webcam feed without specialized hardware.
- **Architecture**: Custom-trained YOLOv8 object detection model served via Flask, streaming video and predictions asynchronously to the browser.
- **Stack**: Python, YOLOv8, Ultralytics, Flask, OpenCV.

### 03 / Launch Control
*Physics-Based Launch Dynamics & PID Controller*
- A pure-software physics simulation comparing an open-loop F1-style clutch launch against a closed-loop PID wheel-slip regulator.
- **Architecture**: Implements Pacejka "magic formula" tire dynamics, coupled rotating/translating vehicle mass models, and a PID controller with anti-windup (leaky integrator) and actuator rate-limiting.
- **Stack**: Python, NumPy, Matplotlib, PID Control, pytest.

### 04 / Slipstream
*Motorsport-Themed Automotive Showcase*
- A responsive, dark-mode automotive web experience for exploring curated car models and comparing performance metrics head-to-head.
- **Stack**: HTML5, Tailwind CSS, JavaScript.
- **Live Demo**: [slipstream17.netlify.app](https://slipstream17.netlify.app)

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation & Motion**: Motion (Framer Motion) & GSAP ScrollTrigger
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React & Custom Accessible SVGs
- **Deployment**: Vercel

---

## Design & Engineering

- **Editorial Aesthetic**: High-contrast black, white, and electric blue palette with intentional whitespace and geometric structure.
- **Fluid Typography**: Custom fluid scale using CSS `clamp()` tokens (`--text-hero`, `--text-h1`, `--text-h2`, `--text-body`, `--text-eyebrow`) scaling smoothly from mobile to 4K displays without layout shifts.
- **Server-First Architecture**: Server Components by default for static sections, delivering near-zero JavaScript bundle overhead for layout and typography.
- **Hardware-Accelerated Mask Reveal**: Instant CSS-driven intro sequence ("Hello," → "This is me.") that animates on frame 0 without waiting for React hydration.
- **Accessible Motion**: Full support for `prefers-reduced-motion` at the OS level, gracefully disabling parallax and motion transitions.
- **Layered Footer**: 3-layer footer architecture featuring an oversized translucent `SID.` background watermark with high-contrast metadata sitting directly over it.

---

## Run Locally

```bash
# Clone repository
git clone https://github.com/SiddheshK1704/Siddhesh_Portfolio.git

# Navigate to project directory
cd Siddhesh_Portfolio/sid-portfolio-phase1/sid-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To test the production build:
```bash
npm run build
npm start
```

---

## Connect

- **Email**: [Compose in Gmail](https://mail.google.com/mail/?view=cm&fs=1&to=siddheshkhankhoje@gmail.com&su=Hello%20Siddhesh) (`siddheshkhankhoje@gmail.com`)
- **GitHub**: [github.com/SiddheshK1704](https://github.com/SiddheshK1704)
- **LinkedIn**: [linkedin.com/in/siddhesh-khankhoje-944980322](https://www.linkedin.com/in/siddhesh-khankhoje-944980322/)
- **Instagram**: [instagram.com/siddheshk_17](https://www.instagram.com/siddheshk_17/)
- **Resume**: [Google Drive](https://drive.google.com/file/d/1C_LeCdoFlPa0siNCvWCRsmrtxFJ-Yn2O/view?usp=sharing)