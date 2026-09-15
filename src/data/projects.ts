export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  problem: string;
  approach: string;
  architecture: string;
  outcome: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
};

// Single source of truth for every project shown on the site.
// Content here is drawn directly from each project's real README —
// nothing invented. Update this file, not the components, when
// project details change.
//
// Order matters here: the Project Depth Stack presents
// projects in exactly this array order — LawTalk, QuickSign,
// Xplainify, Slipstream. The depth-shift presentation gives
// every project equal full-screen treatment.
export const projects: Project[] = [
  {
    slug: "lawtalk",
    title: "LawTalk",
    tagline: "RAG-based AI legal assistant",
    summary:
      "A legal chatbot that grounds its answers in real legal documents instead of relying on an LLM's memory alone, cutting down on hallucinated answers.",
    tags: ["RAG", "FastAPI", "FAISS", "Groq"],
    problem:
      "General-purpose LLMs answer legal questions from training data alone, which makes them prone to confidently stating incorrect or outdated legal information.",
    approach:
      "LawTalk retrieves relevant chunks from an embedded legal-document corpus before generating a response, so the model answers from real source material rather than memory.",
    architecture:
      "A FastAPI backend embeds incoming queries with Sentence Transformers, searches a FAISS vector index for the most relevant legal-document chunks, injects them into a prompt, and sends it to Groq's LLM API for fast inference. Supabase handles user authentication and stores persistent chat history. The frontend is HTML, Tailwind CSS and vanilla JavaScript with GSAP animations.",
    outcome:
      "A working end-to-end RAG pipeline — from document embedding through retrieval to grounded generation — with real auth and chat history, not just a demo script.",
    tech: [
      "FastAPI",
      "FAISS",
      "Sentence Transformers",
      "Groq API",
      "Supabase",
      "Tailwind CSS",
      "GSAP",
    ],
    githubUrl: "https://github.com/SiddheshK1704/LawTalk-AI_RAG_Chatbot",
  },
  {
    slug: "quicksign",
    title: "QuickSign",
    tagline: "Real-time sign language detection with YOLOv8",
    summary:
      "A webcam-based web app that recognizes English sign-language alphabet gestures live, using a custom-trained YOLOv8 model served through Flask.",
    tags: ["YOLOv8", "Computer Vision", "Flask"],
    problem:
      "Recognizing sign language gestures in real time from a webcam feed, without any specialized hardware, in a form accessible through a normal web browser.",
    approach:
      "Capture live webcam frames and run them through a YOLOv8 object-detection model trained specifically on hand-gesture images for each letter of the alphabet, streaming the detection results back to the browser as they happen.",
    architecture:
      "A Flask app serves the interface: a live video feed is streamed through a /video_feed route, frames are run through the trained YOLOv8 model to detect the current hand sign, and the predicted letter is exposed to the frontend through a /get_letter AJAX endpoint that the page polls continuously. A separate /learn page displays reference images for every letter of the alphabet.",
    outcome:
      "A working real-time, browser-based sign-language-to-text interface, along with a documented pipeline for retraining the detection model on new gesture data using Roboflow or LabelImg for annotation and Ultralytics' YOLOv8 training tools.",
    tech: ["Python", "YOLOv8", "Ultralytics", "Flask", "OpenCV"],
    githubUrl:
      "https://github.com/SiddheshK1704/QuickSign-Sign_language_Interpreter",
  },
  {
    slug: "xplainify",
    title: "Xplainify",
    tagline: "AI-powered webpage and code understanding",
    summary:
      "An AI-powered Chrome extension that helps students and developers understand technical webpages and code faster, with AI-generated summaries and beginner-friendly explanations.",
    tags: ["Chrome MV3", "Vanilla JavaScript", "Gemini API", "Chrome APIs"],
    problem:
      "Technical documentation, research papers, and complex codebases often contain dense jargon and unannotated snippets that slow down learning and comprehension for students and developers.",
    approach:
      "Summarize active web pages into structured TL;DRs and key takeaways, detect code blocks automatically for plain-English explanations, and provide on-demand 'Explain Selected Code' via the Chrome context menu—making direct browser-to-Gemini REST API calls using the user's own locally stored API key with zero intermediary backend.",
    architecture:
      "Built on Chrome Extension Manifest V3 using vanilla HTML, CSS, and JavaScript. Content scripts extract and sanitize article content and code blocks with prompt-injection-aware handling; the background service worker handles context menu events and orchestrates dynamic Gemini model discovery; and chrome.storage.local securely stores user API keys and preferences without external servers or user accounts.",
    outcome:
      "A lightweight, privacy-first developer tool that accelerates technical reading and code comprehension directly in the browser with no subscription fees, third-party backend, or data tracking.",
    tech: [
      "Chrome Extension MV3",
      "Vanilla JavaScript",
      "Google Gemini REST API",
      "Chrome Storage API",
      "Chrome Scripting API",
    ],
    githubUrl: "https://github.com/SiddheshK1704/Xplainify",
  },
  /*
  {
    slug: "launch-control",
    title: "Launch Control",
    tagline: "Physics-based launch control simulator",
    summary:
      "A pure-software simulation comparing an open-loop F1-style clutch launch against a closed-loop PID wheel-slip regulator — no hardware, just tire physics and control theory.",
    tags: ["Python", "Control Theory", "Simulation"],
    problem:
      "Electronic launch and traction control were banned in Formula 1 in 2008, leaving drivers to manage wheelspin manually via clutch release. This project asks: how much faster is a standing start with a closed-loop slip regulator, and what actually goes wrong when you try to build one?",
    approach:
      "Model the tire, wheel and vehicle as coupled physical systems, then implement two launch strategies on top: a fixed-ramp open-loop clutch release, and a PID controller that measures wheel slip in real time and cuts (never adds) torque to hold it near the tire's optimum.",
    architecture:
      "A Pacejka 'magic formula' tire model maps slip ratio to a friction coefficient. A vehicle/wheel dynamics model couples two rotating and translating masses through the tire contact patch, with a low-speed floor to avoid a singularity in the slip-ratio formula at a dead stop. The PID slip controller includes anti-windup (a leaky integrator) and torque rate-limiting to model realistic actuator behavior. A CLI runs both strategies and plots the comparison.",
    outcome:
      "Documented, genuinely instructive failure modes hit during development: a naive PID that adds torque early in a launch makes wheelspin worse rather than better; integral windup can stall the controller for seconds without a leaky integrator; and the stiff tire/wheel coupling near zero slip requires a very small simulation timestep (20kHz) to stay numerically stable with explicit integration.",
    tech: ["Python", "NumPy", "Matplotlib", "PID Control", "pytest"],
    githubUrl: "https://github.com/SiddheshK1704/Launch-Control-Project",
  },
  */
  {
    slug: "slipstream",
    title: "Slipstream",
    tagline: "Motorsport-themed automotive showcase",
    summary:
      "A frontend-only site for browsing curated car models, comparing performance stats head-to-head, and showcasing a personal dream garage.",
    tags: ["Frontend", "Tailwind CSS", "Netlify"],
    problem:
      "Built as a personal project to combine an interest in cars and motorsport with frontend design — a cinematic, minimal showcase rather than a data-heavy spec sheet.",
    approach:
      "Four dedicated pages — landing, explore, compare and dream garage — each focused on one job, styled with a dark motorsport-inspired UI, selective glassmorphism and subtle motion.",
    architecture:
      "Fully static HTML, Tailwind CSS and vanilla JavaScript, with no backend — deployed directly to Netlify.",
    outcome:
      "A live, deployed site demonstrating frontend fundamentals: layout, typography, responsive design and micro-interactions, outside of a framework.",
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "Netlify"],
    githubUrl: "https://github.com/SiddheshK1704/Slipstream-CarProject",
    demoUrl: "https://slipstream17.netlify.app",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
