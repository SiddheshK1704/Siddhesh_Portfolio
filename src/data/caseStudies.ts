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
      src: "/projects/lawtalk/landing.png",
      width: 1917,
      height: 927,
      alt: "LawTalk landing page: 'The law, without the fog.' beside a statue of Lady Justice",
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
        src: "/projects/lawtalk/chat.png",
        width: 1917,
        height: 927,
        alt: "LawTalk chat: a question about the Consumer Protection Act answered with numbered citations, with a conversation history sidebar",
        caption: "The chat: a question on the Consumer Protection Act, answered with numbered citations back to the source passages — history on the left.",
      },
      {
        src: "/projects/lawtalk/evidence-panel.png",
        width: 432,
        height: 927,
        alt: "LawTalk evidence panel listing cited passages from the Constitution of India with article and page tags",
        caption: "The evidence panel: every citation opens the retrieved passage, tagged with its source, article and page, so answers can be checked.",
      },
      {
        src: "/projects/lawtalk/signup.png",
        width: 1917,
        height: 927,
        alt: "LawTalk 'Open your workspace.' sign-up modal in a circle over the dimmed landing page",
        caption: "Supabase-backed sign-up, so chats persist per user.",
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

  "design-shelf": {
    category: "AI / Design Tool",
    heroTech: ["React", "TypeScript", "Vite", "Gemini API", "Supabase"],
    // Screenshots use the app's built-in sample references, which are
    // tagged by hand; with no API key, search falls back to keywords.
    heroShot: {
      src: "/projects/design-shelf/library-search.png",
      width: 1600,
      height: 900,
      alt: "Design Shelf library with 'warm, crafted' in the search bar and five matching sample illustrations, including a leather tote and a walnut sideboard, beside mood and detail tag filters",
      caption: "Search by feel, not by file name. Shown with the hand-tagged sample references and keyword search.",
    },
    overview: [
      "Design Shelf is a reference library for designers. You add references, Gemini describes what a designer would notice, and a plain-English search finds them again.",
      "It works for products, vehicles, materials, interfaces, graphics, interiors, fashion and packaging. It calls Gemini directly from the browser with your own key, and an assistant can suggest directions or turn a brief into a design doc.",
    ],
    problem:
      "References end up in folders named IMG_4532, in chat threads and on boards nobody can search. Designers remember how a reference felt, not where they saved it or what they called it.",
    workflow: {
      heading: "From a pile of images to a search by feel.",
      steps: [
        { title: "Add", detail: "Drop, choose or paste images into the library. Batches are fine.", tech: "IndexedDB · Supabase Storage" },
        { title: "Tag", detail: "Gemini vision fills structured tags for form, material, colour, mood and details, plus a group from the chosen lens: General, Industrial, Vehicle, CMF, UI/UX, Graphic, Interiors, Fashion, Packaging, or your own.", tech: "Gemini · JSON schema" },
        { title: "Embed", detail: "The subject, description and tags become an embedding, so each image can be found by meaning.", tech: "Gemini embeddings" },
        { title: "Search", detail: "Describe what you want. Ranking combines meaning with a small boost for exact tag matches, so “quiet” can find an image tagged “calm”.", tech: "Cosine similarity · pgvector" },
        { title: "Refine", detail: "Filter by tag, open “More like this”, edit any tag, and group references into boards.", tech: "Tag filters · Boards" },
      ],
      note: "Your Gemini key stays in the browser and is sent only to Google.",
    },
    techGroups: [
      { label: "Platform", items: ["React", "Vite", "React Router", "IndexedDB", "Supabase (Postgres, pgvector, Auth, Storage)", "Vercel"] },
      { label: "Language", items: ["TypeScript", "CSS"] },
      { label: "APIs", items: ["Google Gemini API", "Supabase JS", "Openverse", "Wikimedia Commons"] },
    ],
    features: [
      { title: "Lenses for any discipline", detail: "Nine built-in lenses add what each discipline looks for, like stance for vehicles or gloss for CMF. Write your own, and re-tag any image with a different lens." },
      { title: "Search by feel", detail: "Meaning-based search with a keyword boost, and tag filters that combine." },
      { title: "Real colour palettes", detail: "Five colours are extracted from each image's pixels in the browser. Click a swatch to copy its hex code." },
      { title: "Bring your own key", detail: "Gemini runs on your key, stored in the browser. Without one you can still tag by hand and search by keyword." },
      { title: "Editable tags and boards", detail: "Every tag and description can be edited, and “More like this” finds close matches. Boards group references per project; one image can sit on many." },
      { title: "Assistant", detail: "Ask for directions or turn a brief into a design doc, matched against your own shelf." },
      { title: "Written for designers", detail: "A plain “How it works” page covers the key, lenses, search, boards and privacy, for people who don't write code." },
    ],
    gallery: [
      {
        src: "/projects/design-shelf/library-filters.png",
        width: 1600,
        height: 900,
        alt: "Design Shelf library grid of nine sample illustrations, each with a colour strip, next to mood and detail tag filters with counts",
        caption: "The library: tag filters on the left, a colour strip under every reference. These are the built-in samples, tagged by hand.",
      },
      {
        src: "/projects/design-shelf/image-detail.png",
        width: 1600,
        height: 900,
        alt: "Detail view of the 'Saddle leather tote' sample: a description, editable mood and detail tags, and a five-colour palette",
        caption: "Open any reference to edit its description and tags. The palette comes from the image itself.",
      },
    ],
    learned: [
      { title: "Discover models, don't hardcode them", detail: "Gemini models change often. Listing them from the API, and moving to the next one on a rate limit, keeps the app working without a redeploy." },
      { title: "Structured output still needs checking", detail: "A JSON schema fixes the shape of a reply, not its quality, so tags are trimmed, lowercased, de-duplicated and capped before they're saved." },
      { title: "Configuration beats code", detail: "A lens is just a name, a focus and tag groups. Supporting a new discipline means adding config, not writing a feature." },
      { title: "AI tags need a human pass", detail: "AI tags are a first draft, not the final word, so every tag and description can be fixed in a click." },
      { title: "Design for people who don't code", detail: "An API key is unfamiliar to most designers, so the app explains it in plain language and still works without one." },
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
