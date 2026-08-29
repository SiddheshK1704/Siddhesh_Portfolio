export interface ContactLink {
  label: string;
  href: string;
  type: "email" | "external";
  ariaLabel: string;
}

export const CONTACT_DATA = {
  // Real GitHub profile
  github: {
    label: "GITHUB",
    href: "https://github.com/SiddheshK1704",
    type: "external" as const,
    ariaLabel: "GitHub profile (opens in a new tab)",
  },
  // Real Instagram profile (canonical URL without tracking params)
  instagram: {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/siddheshk_17/",
    type: "external" as const,
    ariaLabel: "Instagram profile (opens in a new tab)",
  },
  // Real LinkedIn profile
  linkedin: {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/siddhesh-khankhoje-944980322/",
    type: "external" as const,
    ariaLabel: "LinkedIn profile (opens in a new tab)",
  },
  // Real Email
  email: {
    label: "EMAIL",
    href: "mailto:siddheshkhankhoje@gmail.com",
    type: "email" as const,
    ariaLabel: "Send an email to siddheshkhankhoje@gmail.com",
  },
  // Resume link preserved exactly
  resume: {
    label: "VIEW RESUME",
    href: "https://drive.google.com/file/d/1C_LeCdoFlPa0siNCvWCRsmrtxFJ-Yn2O/view?usp=sharing",
    type: "external" as const,
    ariaLabel: "View Resume PDF on Google Drive (opens in a new tab)",
  },
};
