// Shared by the server layout (inline script) and client code, so this
// module must not be marked "use client".

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "sid-theme";

/**
 * Runs before first paint (inlined in layout.tsx): restores a saved theme
 * onto <html data-theme>, so a light-theme visitor never sees a dark flash.
 * Dark is the default and is already rendered by the server.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
