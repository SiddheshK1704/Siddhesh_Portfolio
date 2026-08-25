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
  featured?: boolean;
};

// Single source of truth for every project shown on the site.
// Content here is drawn directly from each project's real README —
// nothing invented. Update this file, not the components, when
// project details change.
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
    featured: true,
  },
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
    featured: true,
  },
  {
    slug: "energy-prediction",
    title: "Time Series Energy Prediction",
    tagline: "LSTM-based electricity consumption forecasting",
    summary:
      "A deep learning model that forecasts hourly electricity demand from a year of historical building energy data, comparing recurrent and transformer-based approaches.",
    tags: ["LSTM", "Transformer", "Time Series"],
    problem:
      "Predicting near-term electricity demand from historical usage patterns supports smart energy management and load forecasting.",
    approach:
      "Frame the problem as sequence prediction: use the last 24 hours of consumption to forecast the next hour, training on a year of hourly building energy data covering electricity, HVAC, lighting and equipment usage.",
    architecture:
      "Raw timestamps are cleaned and sorted chronologically, then converted into overlapping 24-hour input sequences. A univariate LSTM (50 units, feeding a dense output layer) is trained with the Adam optimizer and MSE loss, using early stopping to prevent overfitting. A separate Transformer-based model is implemented alongside it for comparison.",
    outcome:
      "A trained forecasting model evaluated with RMSE and MAE, plus a full exploratory data analysis pass (yearly, weekly and hourly consumption patterns) informing the modeling choices.",
    tech: ["Python", "TensorFlow/Keras", "Pandas", "NumPy", "Scikit-Learn"],
    githubUrl:
      "https://github.com/SiddheshK1704/Energy_Prediction_LSTM_Minor_Project",
  },
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
