// Content for the About section, kept apart from its presentation.
//
// Image paths are the exact files in /public/about/ (names untouched —
// spaces and mixed formats included). next/image URL-encodes them.
// Dimensions are the files' true pixel sizes, so every image keeps its
// real aspect ratio.

export type AboutImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const sunset = {
  /** Default layer: the 8-bit version */
  pixel: {
    src: "/about/sunset/8_bit_Portflio Image.png",
    width: 1164,
    height: 1351,
    alt: "Pixel-art portrait of Siddhesh on a beach at dusk, in a patterned shirt, under a pink and blue sky",
  },
  /** Revealed underneath, block by block */
  photo: {
    src: "/about/sunset/sunset pic.jpeg",
    width: 1380,
    height: 1600,
    alt: "Photograph of Siddhesh on a beach at dusk, in a patterned shirt, under a pink and blue sky",
  },
} satisfies Record<string, AboutImage>;

export const photographs: AboutImage[] = [
  { src: "/about/photography/WhatsApp Image 2026-09-30 at 18.48.48.jpeg", width: 960, height: 1280, alt: "Black-and-white photograph of a carved stone temple tower against an overcast sky" },
  { src: "/about/photography/WhatsApp Image 2026-09-30 at 18.49.38.jpeg", width: 960, height: 1280, alt: "Two trains side by side under a pink and orange sunset sky" },
  { src: "/about/photography/WhatsApp Image 2026-09-30 at 18.50.25.jpeg", width: 960, height: 1280, alt: "A white lion statue on a pillar against grey clouds" },
  { src: "/about/photography/WhatsApp Image 2026-09-30 at 18.50.38.jpeg", width: 960, height: 1280, alt: "Bright blue sky and clouds above a hedge of white flowers" },
  { src: "/about/photography/WhatsApp Image 2026-09-30 at 18.50.56.jpeg", width: 960, height: 1280, alt: "Tall cream apartment buildings under a deep blue sky" },
  { src: "/about/photography/WhatsApp Image 2026-09-30 at 18.51.33.jpeg", width: 960, height: 1280, alt: "The sea at dusk, the sky fading from orange to deep blue" },
  { src: "/about/photography/WhatsApp Image 2026-09-30 at 18.56.23.jpeg", width: 720, height: 1280, alt: "An ornate palace facade lit pink at night, seen from below" },
];

export type Game = AboutImage & { title: string; favourite?: boolean };

export const games: Record<"ghost" | "gow" | "phasmo" | "cs2" | "f1", Game> = {
  ghost: { title: "Ghost of Tsushima", src: "/about/games/Ghost of Tsushima.jpg", width: 600, height: 900, alt: "Ghost of Tsushima cover art", favourite: true },
  gow: { title: "God of War", src: "/about/games/God Of War.jpg", width: 700, height: 1050, alt: "God of War cover art" },
  phasmo: { title: "Phasmophobia", src: "/about/games/Phasmophobia.webp", width: 600, height: 900, alt: "Phasmophobia cover art" },
  cs2: { title: "Counter-Strike 2", src: "/about/games/Counter Strike 2.jpg", width: 616, height: 353, alt: "Counter-Strike 2 key art" },
  f1: { title: "F1 25", src: "/about/games/F1_25_cover_art.jpg", width: 283, height: 354, alt: "F1 25 cover art" },
};
