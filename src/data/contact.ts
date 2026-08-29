export interface ContactLink {
  label: string;
  href: string;
  type: "email" | "external";
  ariaLabel: string;
  address?: string;
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
  // Email — opens Gmail Web Compose directly with recipient and subject pre-filled
  email: {
    label: "EMAIL",
    address: "siddheshkhankhoje@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=siddheshkhankhoje@gmail.com&su=Hello%20Siddhesh",
    type: "external" as const,
    ariaLabel: "Compose email to siddheshkhankhoje@gmail.com in Gmail (opens in a new tab)",
  },
  // Resume link preserved exactly
  resume: {
    label: "VIEW RESUME",
    href: "https://drive.google.com/file/d/1C_LeCdoFlPa0siNCvWCRsmrtxFJ-Yn2O/view?usp=sharing",
    type: "external" as const,
    ariaLabel: "View Resume PDF on Google Drive (opens in a new tab)",
  },
};
