// Case-study content for /work/[slug], layered on top of `projects.ts`
// (which stays the source of truth for titles, links and summaries).
//
// Everything here is drawn from each project's README and repository
// structure — no invented features, technologies or metrics. Screenshots
// are the real assets in /public/projects/<slug>/ with their true sizes.

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type Step = { title: string; detail: string; tech?: string };
export type Point = { title: string; detail: string };

export type CaseStudy = {
  /** Short category shown in the hero */
  category: string;
  /** Headline technologies for the hero (subset of techGroups) */
  heroTech: string[];
  heroShot: Shot;
  /** "popup" = a small UI shown at native size on a stage */
  heroFrame?: "wide" | "popup";
  overview: [lead: string, ...rest: string[]];
  problem: string;
  /** Real request/data flow (or page flow for static sites) */
  workflow: { heading: string; steps: Step[]; note?: string };
  techGroups: { label: string; items: string[] }[];
  features: Point[];
  gallery: Shot[];
  learned: Point[];
};

export const caseStudies: Record<string, CaseStudy> = {
  lawtalk: {
    category: "AI / RAG",
    heroTech: ["FastAPI", "FAISS", "Sentence Transformers", "Groq API", "Supabase"],
    heroShot: {
      src: "/projects/lawtalk/hero.png",
      width: 1917,
      height: 927,
      alt: "LawTalk AI landing page: 'Justice, Reimagined by Intelligence.' beside a statue of Lady Justice",
    },
    overview: [
      "LawTalk is an AI legal assistant that answers from real legal documents instead of from the model's memory alone.",
      "It pairs a retrieval pipeline — Sentence Transformer embeddings searched with FAISS — with Groq's fast LLM inference behind a FastAPI backend, and wraps it in a real product: Supabase authentication, persistent chat history and a history sidebar to pick conversations back up.",
    ],
    problem:
      "General-purpose LLMs answer legal questions from training data alone, which makes them prone to confidently stating incorrect or outdated legal information — with no way to tell grounded answers from hallucinated ones.",
    workflow: {
      heading: "A question, grounded before it's answered.",
      steps: [
        { title: "Ask", detail: "The chat UI sends the question to the backend's POST /ask endpoint for a signed-in session.", tech: "Supabase Auth · FastAPI" },
        { title: "Embed", detail: "The query is converted into a dense vector.", tech: "Sentence Transformers" },
        { title: "Retrieve", detail: "The vector is searched against a pre-built index of chunked legal documents; the top-k chunks become context.", tech: "FAISS" },
        { title: "Ground", detail: "Retrieved chunks are injected into a structured prompt alongside the original question.", tech: "rag.py" },
        { title: "Generate", detail: "The enriched prompt is sent for inference and the grounded answer returns to the chat.", tech: "Groq API" },
        { title: "Remember", detail: "Conversations are stored so they can be reopened from the history sidebar.", tech: "Supabase DB" },
      ],
    },
    techGroups: [
      { label: "Backend", items: ["Python", "FastAPI", "Python-dotenv"] },
      { label: "Retrieval & AI", items: ["Sentence Transformers", "FAISS", "Groq API"] },
      { label: "Data & Auth", items: ["Supabase Auth", "Supabase DB", "Supabase JS SDK"] },
      { label: "Frontend", items: ["HTML5", "Tailwind CSS", "Vanilla JavaScript", "GSAP"] },
    ],
    features: [
      { title: "Grounded answers", detail: "Every response is built on legal-document chunks retrieved from a FAISS index, anchoring the model to real sources." },
      { title: "Fast inference", detail: "Groq's inference API keeps responses near-instant, even with retrieved context in the prompt." },
      { title: "Accounts & persistent history", detail: "Supabase handles sign-up, login and sessions, and stores every chat and message." },
      { title: "Resume any conversation", detail: "A history sidebar lists previous chats so a question can be picked up where it was left." },
      { title: "Documented API", detail: "A clean FastAPI endpoint (POST /ask) that can be integrated or extended independently of the UI." },
    ],
    gallery: [
      {
        src: "/projects/lawtalk/screenshot1.png",
        width: 1917,
        height: 927,
        alt: "LawTalk chat: a tenant-rights question answered with statutes, notice periods and next steps, with a history sidebar",
        caption: "The chat: a tenancy question answered with the relevant acts, notice periods and next steps — history on the left.",
      },
      {
        src: "/projects/lawtalk/screenshot2.png",
        width: 1917,
        height: 927,
        alt: "LawTalk login modal over the blurred landing page",
        caption: "Supabase-backed login, so chats persist per user.",
      },
    ],
    learned: [
      { title: "Retrieval decides answer quality", detail: "The model can only ground on what FAISS returns, so how documents are chunked and embedded matters as much as the prompt itself." },
      { title: "Grounding has to be designed into the prompt", detail: "Retrieved context only reduces hallucination when it's injected into a structured template that frames it as the source of truth." },
      { title: "Persistence turns a demo into a product", detail: "Modelling chats and messages in Supabase — with auth in front — is what made the assistant usable across sessions." },
    ],
  },

  quicksign: {
    category: "Computer Vision",
    heroTech: ["Python", "YOLOv8", "Flask", "OpenCV"],
    heroShot: {
      src: "/projects/quicksign/screenshot1.png",
      width: 1901,
      height: 917,
      alt: "QuickSign live detection: a webcam frame with a bounding box around a hand signing V, and the detected letter V",
      caption: "Live detection: the model boxes the hand and reports the letter in real time.",
    },
    overview: [
      "QuickSign is a web app that recognizes English sign-language alphabet gestures live from a webcam.",
      "A custom-trained YOLOv8 model runs on each frame inside a Flask app; the annotated video and the predicted letter are streamed back to an ordinary browser page — no special hardware, no install.",
    ],
    problem:
      "Recognizing sign language in real time usually needs specialized setups. The goal was to do it from a plain webcam feed, in a form anyone can open in a normal web browser.",
    workflow: {
      heading: "From a webcam frame to a letter on screen.",
      steps: [
        { title: "Capture", detail: "Frames are read from the webcam on the server.", tech: "OpenCV" },
        { title: "Detect", detail: "Each frame runs through a YOLOv8 model trained on hand-gesture images for every letter.", tech: "YOLOv8 · Ultralytics" },
        { title: "Stream", detail: "Annotated frames — with the detection box — are streamed to the page through the /video_feed route.", tech: "Flask" },
        { title: "Report", detail: "The latest predicted letter is exposed on a separate /get_letter endpoint.", tech: "Flask" },
        { title: "Display", detail: "The page polls /get_letter continuously and shows the detected letter live.", tech: "JavaScript (AJAX)" },
      ],
    },
    techGroups: [
      { label: "Model", items: ["YOLOv8", "Ultralytics"] },
      { label: "Backend", items: ["Python", "Flask", "OpenCV"] },
      { label: "Frontend", items: ["HTML templates", "JavaScript (AJAX polling)"] },
    ],
    features: [
      { title: "Real-time letter detection", detail: "Hand signs are recognized straight from the webcam feed as they happen." },
      { title: "Custom-trained YOLOv8 model", detail: "A detection model trained specifically on gesture images for each letter of the alphabet." },
      { title: "Live stream + live letter", detail: "Video (/video_feed) and predictions (/get_letter) are served separately, so the page updates continuously." },
      { title: "Learn page", detail: "A reference grid of every A–Z hand sign with a short description of how to form it." },
      { title: "Retrainable", detail: "A documented path to retrain on new gesture data and swap in new weights." },
    ],
    gallery: [
      {
        src: "/projects/quicksign/hero.png",
        width: 1901,
        height: 927,
        alt: "QuickSign landing page: 'Breaking Barriers with Sign Language Technology'",
        caption: "The landing page.",
      },
      {
        src: "/projects/quicksign/screenshot2.png",
        width: 1901,
        height: 925,
        alt: "QuickSign Learn page: a grid of American Sign Language alphabet cards from A to R",
        caption: "The Learn page: the full sign alphabet, with how to form each letter.",
      },
    ],
    learned: [
      { title: "Real-time is a serving problem, not just a model problem", detail: "Splitting the video stream and the prediction into separate endpoints keeps the page responsive while inference runs continuously." },
      { title: "A focused dataset beats a generic detector", detail: "Training YOLOv8 on per-letter gesture images is what made alphabet-level recognition work at all." },
      { title: "Design the model to be replaceable", detail: "Keeping the weights as a swappable file, with a documented retraining path, means accuracy can improve without touching the app." },
    ],
  },

  xplainify: {
    category: "Developer Tool",
    heroTech: ["Chrome Extension MV3", "Vanilla JavaScript", "Gemini REST API"],
    heroShot: {
      src: "/projects/xplainify/hero.png",
      width: 517,
      height: 467,
      alt: "Xplainify popup: 'Understand before you read.' showing the current page (World War II – Wikipedia) and a Summarize button",
    },
    heroFrame: "popup",
    overview: [
      "Xplainify is a Chrome extension that turns dense articles, documentation and code into clear, verifiable insights.",
      "It summarizes the active page with click-to-source citations, detects and explains code blocks, and adds an 'Explain selected code' context-menu action — all by calling Google's Gemini API directly from the browser, with zero backend servers.",
    ],
    problem:
      "Most AI summarizers fail in two ways: their claims come with no attribution, so you can't verify them against the author's words — and they route your browsing content through their own backend servers, adding latency and privacy risk.",
    workflow: {
      heading: "Browser to Gemini and back, with receipts.",
      steps: [
        { title: "Extract", detail: "The page's main content is cloned in memory, 25+ kinds of noise are stripped, and paragraphs are tagged [§N] — within a 12,000-character budget.", tech: "extractor.js" },
        { title: "Classify code", detail: "Candidate snippets are scored against structural, content and blocklist signals; only a score ≥ 20 counts as code.", tech: "Weighted scoring" },
        { title: "Resolve model", detail: "The newest suitable Gemini Flash model is discovered via the Models API and cached for 6 hours.", tech: "v1beta/models" },
        { title: "Generate", detail: "The request goes straight to Gemini with the user's key in the x-goog-api-key header.", tech: "Gemini REST API" },
        { title: "Render & cite", detail: "Output is rendered without innerHTML; clicking a [§N] citation scrolls the page to the source paragraph and highlights it.", tech: "chrome.scripting" },
      ],
      note: "No backend: the API key lives only in chrome.storage.local.",
    },
    techGroups: [
      { label: "Platform", items: ["Chrome Extension Manifest V3", "Service Worker"] },
      { label: "Language", items: ["HTML", "CSS", "Vanilla JavaScript"] },
      { label: "APIs", items: ["Google Gemini REST API", "chrome.storage", "chrome.scripting", "Context Menus"] },
    ],
    features: [
      { title: "Summaries with citations", detail: "Every key takeaway carries a [§N] citation that scrolls to and highlights its exact source paragraph." },
      { title: "Code detection & explanation", detail: "A weighted scoring model separates real code from math, IPA and tables before explaining it." },
      { title: "Explain selected code", detail: "Highlight any code on a page and explain it from the right-click menu." },
      { title: "Zero backend", detail: "Requests go browser → Gemini directly; the key is stored locally and sent only in a request header." },
      { title: "Self-healing model selection", detail: "Models are discovered dynamically, cached for 6 hours, and re-resolved automatically if one is retired (HTTP 404)." },
    ],
    gallery: [],
    learned: [
      { title: "Deterministic work before the LLM", detail: "Extraction, noise stripping and code scoring shrink and clean the input, which does more for output quality than prompt tweaks alone." },
      { title: "Trust needs a way to verify", detail: "Tying each takeaway to a source paragraph turns an opaque summary into something a reader can check in one click." },
      { title: "Never hardcode a model", detail: "Discovering models at runtime and recovering from 404s keeps the extension working as providers retire versions." },
      { title: "Client-only still needs a threat model", detail: "Header-based keys, fenced untrusted page content and no innerHTML rendering were necessary once there's no server in between." },
    ],
  },

  slipstream: {
    category: "Frontend",
    heroTech: ["HTML5", "Tailwind CSS", "Vanilla JavaScript", "Netlify"],
    heroShot: {
      src: "/projects/slipstream/hero.png",
      width: 1917,
      height: 927,
      alt: "Slipstream landing page: a black Lamborghini Huracán by the sea with the Slipstream wordmark",
    },
    overview: [
      "Slipstream is a motorsport-inspired site for exploring legendary cars, comparing performance icons head-to-head and showcasing a personal dream garage.",
      "It's deliberately frontend-only — static HTML, Tailwind CSS and vanilla JavaScript deployed to Netlify — to focus entirely on layout, typography, imagery and motion.",
    ],
    problem:
      "Car sites tend to be either data-heavy spec sheets or pure galleries. The goal was a cinematic, minimal showcase that balances performance data with emotional storytelling — built on frontend fundamentals, without a framework.",
    workflow: {
      heading: "Four pages, one job each.",
      steps: [
        { title: "Landing", detail: "A cinematic, Huracán-inspired hero that sets the tone.", tech: "index.html" },
        { title: "Explore", detail: "Browse iconic models by manufacturer, with year, power and price.", tech: "explore.html" },
        { title: "Compare", detail: "Put two performance icons head-to-head.", tech: "compare.html" },
        { title: "Dream Garage", detail: "A hand-picked personal collection of automotive icons.", tech: "garage.html" },
      ],
      note: "Fully static — no backend — deployed directly to Netlify.",
    },
    techGroups: [
      { label: "Frontend", items: ["HTML5", "Tailwind CSS", "Vanilla JavaScript"] },
      { label: "Deployment", items: ["Netlify"] },
    ],
    features: [
      { title: "Cinematic landing", detail: "A Huracán-inspired hero built around strong imagery and typography." },
      { title: "Explore by brand", detail: "Iconic models from legendary manufacturers, each with year, power and price." },
      { title: "Head-to-head compare", detail: "A dedicated page for comparing two performance cars." },
      { title: "My Dream Garage", detail: "A personally curated showcase of automotive icons." },
      { title: "Responsive, motorsport UI", detail: "Dark themes, selective glassmorphism and subtle motion that hold up across devices." },
    ],
    gallery: [
      {
        src: "/projects/slipstream/screenshot1.png",
        width: 1900,
        height: 927,
        alt: "Slipstream Explore page: brand tabs and Lamborghini models with year, power and price",
        caption: "Explore: pick a manufacturer, browse its models with year, power and price.",
      },
      {
        src: "/projects/slipstream/screenshot2.png",
        width: 1902,
        height: 922,
        alt: "Slipstream My Dream Garage page: Porsche 911 Turbo S, Ferrari 812 Superfast and Huracán Performante",
        caption: "My Dream Garage: a personal collection, one card per car.",
      },
    ],
    learned: [
      { title: "Polish doesn't require a framework", detail: "Static HTML, Tailwind and a little vanilla JavaScript were enough for a cinematic, responsive site." },
      { title: "One page, one job", detail: "Giving landing, explore, compare and garage a single purpose each kept every page focused and easy to navigate." },
      { title: "Typography and imagery carry the design", detail: "Strong type, spacing and cinematic photography did more than decoration — minimalism over clutter." },
    ],
  },
};
