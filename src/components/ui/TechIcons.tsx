import React from "react";

export function TechIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name.toLowerCase()) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M11.91 2c-5.06 0-4.73 2.19-4.73 2.19l.01 2.27h4.81v.68H5.2S2 6.78 2 11.95c0 5.18 2.78 5.03 2.78 5.03h1.66v-2.33s-.09-2.78 2.72-2.78h4.69s2.63.04 2.63-2.56V4.56S16.97 2 11.91 2zm-2.58 1.48a.9.9 0 110 1.8.9.9 0 010-1.8z"
            fill="#387eb8"
          />
          <path
            d="M12.09 22c5.06 0 4.73-2.19 4.73-2.19l-.01-2.27H12v-.68h6.79s3.2.36 3.2-4.81c0-5.18-2.78-5.03-2.78-5.03h-1.66v2.33s.09 2.78-2.72 2.78H10.14s-2.63-.04-2.63 2.56v4.75S7.03 22 12.09 22zm2.58-1.48a.9.9 0 110-1.8.9.9 0 010 1.8z"
            fill="#ffe052"
          />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="3" fill="#F7DF1E" />
          <path
            d="M6.5 18.5c1.2.7 2.6 1.1 3.9 1.1 2.3 0 3.8-1.1 3.8-3.1 0-2-1.3-2.8-3.2-3.6l-.7-.3c-1.1-.5-1.7-.9-1.7-1.8 0-.9.8-1.6 2.1-1.6 1.1 0 2.1.4 3 .9l.7-2.3c-1-.5-2.2-.8-3.4-.8-3.1 0-4.9 1.7-4.9 3.9 0 1.9 1.2 2.9 3 3.6l.7.3c1.3.5 1.9 1 1.9 2 0 1.1-1 1.8-2.4 1.8-1.3 0-2.6-.5-3.6-1.2l-.7 2.4zM16.5 7.2h2.8v9.4c0 2.4-1.3 3.6-3.7 3.6-1 0-2.1-.3-2.9-.8l.7-2.3c.6.4 1.3.6 2 .6 1.1 0 1.6-.5 1.6-1.7V7.2z"
            fill="#000"
          />
        </svg>
      );
    case "c++":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm-1.8 14.8c-2.7 0-4.7-2-4.7-4.8 0-2.7 2-4.8 4.7-4.8 1.6 0 2.8.6 3.6 1.6l-1.6 1.4c-.6-.7-1.2-1-2-1-1.6 0-2.6 1.3-2.6 2.8s1 2.8 2.6 2.8c.9 0 1.5-.4 2-1l1.6 1.4c-.8 1-2 1.6-3.6 1.6zm7.2-4.1h1.1v-1.1h1v1.1h1.1v1h-1.1v1.1h-1v-1.1h-1.1v-1zm-3.4 0h1.1v-1.1h1v1.1h1.1v1h-1.1v1.1h-1v-1.1h-1.1v-1z"
            fill="#00599C"
          />
        </svg>
      );
    case "c":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm0 15.6c-3.1 0-5.6-2.5-5.6-5.6S8.9 6.4 12 6.4c2 0 3.7.9 4.7 2.3l-2.1 1.8c-.6-.8-1.5-1.3-2.6-1.3-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1.1 0 2-.5 2.6-1.3l2.1 1.8c-1 1.4-2.7 2.3-4.7 2.3z"
            fill="#A8B9CC"
          />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M8.8 17.6c2.4.3 4.9.4 7.2-.6-1.8 1.1-4.8 1.5-7.2.6zm-1.1-2.9c3.2.4 6.7.4 9.8-.8-2.6 1.3-6.5 1.7-9.8.8zm8.6-6.4c.5 1.1.2 2.3-.6 3.3 1.3-.9 1.8-2.2 1.2-3.3zm-5.7-6.2c-.4 1.2.3 2.5 1.5 3.4-.2-1.3-.8-2.4-1.5-3.4zm4.2 3.1c-.6 1.3-.3 2.8.9 3.8.1-1.5-.3-2.8-.9-3.8zM6.5 20.3c3.8.4 8.5.2 12.1-1.3-3.2 1.5-8.2 2-12.1 1.3z"
            fill="#EA2D2E"
          />
          <path
            d="M10.7 12.1c.4 1.1.1 2.3-.9 3.2 1.4-.9 1.8-2.1 1.2-3.2z"
            fill="#5382A1"
          />
        </svg>
      );
    case "html5":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3zm14.8 5.6h-8.2l.2 2.3h7.8l-.6 6.9-4.2 1.2-4.2-1.2-.3-3.3h2.3l.1 1.7 2.1.6 2.1-.6.2-2.7H7.7L7 5.3h11.1l-.3 2.3z" fill="#E34F26" />
        </svg>
      );
    case "css3":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3zm14.8 5.6h-8.2l.2 2.3h7.8l-.6 6.9-4.2 1.2-4.2-1.2-.3-3.3h2.3l.1 1.7 2.1.6 2.1-.6.2-2.7H7.7L7 5.3h11.1l-.3 2.3z" fill="#1572B6" />
        </svg>
      );
    case "tailwind css":
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 6c-3.6 0-5.8 1.8-6.8 5.4 1.4-1.8 3-2.5 5-2 1.1.3 1.9 1.1 2.8 2 1.5 1.5 3.1 3.2 6.9 3.2 3.6 0 5.8-1.8 6.8-5.4-1.4 1.8-3 2.5-5 2-1.1-.3-1.9-1.1-2.8-2-1.5-1.5-3.1-3.2-6.9-3.2zm-6.9 6.6c-3.6 0-5.8 1.8-6.8 5.4 1.4-1.8 3-2.5 5-2 1.1.3 1.9 1.1 2.8 2 1.5 1.5 3.1 3.2 6.9 3.2 3.6 0 5.8-1.8 6.8-5.4-1.4 1.8-3 2.5-5 2-1.1-.3-1.9-1.1-2.8-2-1.5-1.5-3.1-3.2-6.9-3.2z"
            fill="#38BDF8"
          />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(30 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(90 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(150 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );
    case "next.js":
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.2" />
          <path d="M8 8v8M16 8l-6.8 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 11v5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "flask":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M9 3h6v2H9V3zm1 3h4v4.5l4.5 9c.7 1.4-.3 3.5-2 3.5H7.5c-1.7 0-2.7-2.1-2-3.5L10 10.5V6zm2 7a2 2 0 100 4 2 2 0 000-4z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" fill="#059669" />
          <path d="M12 4L6 14h5l-1 6 6-10h-5l1-6z" fill="#FFFFFF" />
        </svg>
      );
    case "opencv":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="6" r="3.5" stroke="#EE2A24" strokeWidth="1.8" />
          <circle cx="6.5" cy="16.5" r="3.5" stroke="#009639" strokeWidth="1.8" />
          <circle cx="17.5" cy="16.5" r="3.5" stroke="#0080FF" strokeWidth="1.8" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 3c-5 0-9 4-9 9 0 3 1.5 5.7 3.8 7.3l1.2-1.7C6.3 16.3 5 14.3 5 12c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.7-.6 3.2-1.6 4.4l-2.4-2.4c.6-.6 1-1.3 1-2 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.2.7 2.2 1.7 2.7l-1.4 1.4c-1.4-.8-2.3-2.3-2.3-4.1 0-2.8 2.2-5 5-5s5 2.2 5 5c0 1.1-.3 2.1-.9 3l1.8 1.8c1.3-1.3 2.1-3 2.1-4.8 0-5-4-9-9-9z"
            fill="#00758F"
          />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M13.2 22.8c-.8.9-2.2.4-2.2-.8V13h8.3c1.3 0 2 1.6 1 2.5l-7.1 7.3zm-2.4-21.6c.8-.9 2.2-.4 2.2.8V11H4.7c-1.3 0-2-1.6-1-2.5l7.1-7.3z"
            fill="#3ECF8E"
          />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M21.7 10.9L13.1 2.3c-.4-.4-1.1-.4-1.5 0L9.4 4.5l3.2 3.2c.4-.1.8 0 1.1.3.5.5.5 1.3.1 1.8l3.1 3.1c.5-.4 1.3-.4 1.8.1.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.2-1.5L13.4 10.4v6.2c.2.1.4.3.5.5.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.4.6-.5v-6.3c-.2-.1-.4-.3-.6-.5-.4-.4-.5-1-.2-1.5L8.4 5.5 2.3 11.6c-.4.4-.4 1.1 0 1.5l8.6 8.6c.4.4 1.1.4 1.5 0l9.3-9.3c.4-.4.4-1.1 0-1.5z"
            fill="#F05032"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2L22 20H2L12 2z" fill="#FFFFFF" />
        </svg>
      );
    case "vs code":
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M17.5 2.3l-8.7 8.3-5.2-4L2 8.1l4.2 3.9L2 15.9l1.6 1.5 5.2-4 8.7 8.3L22 20V4l-4.5-1.7zm0 5.2v9l-5.3-4.5 5.3-4.5z"
            fill="#007ACC"
          />
        </svg>
      );
    default:
      return (
        <span className="w-2 h-2 rounded-full bg-accent inline-block" />
      );
  }
}
