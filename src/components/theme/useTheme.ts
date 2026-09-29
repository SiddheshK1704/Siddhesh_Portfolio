"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "./themeScript";

/*
 * The theme lives on <html data-theme> (set before paint by THEME_SCRIPT);
 * React subscribes to it. The server always renders "dark", and
 * useSyncExternalStore reconciles to the real value after hydration
 * without a mismatch.
 */

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

/**
 * Applies a theme synchronously (DOM attribute + subscribers). The
 * attribute is the single source of truth; React only mirrors it.
 *
 * CSS transitions are suspended for the swap: otherwise every element with
 * transition-colors/-all would fade between palettes inside the new
 * view-transition snapshot, which reads as flicker behind the sweep.
 */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-swap");
  root.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
  listeners.forEach((l) => l());
  // Commit the new styles while transitions are off, then re-enable them
  // after the next frames (no values change then, so nothing animates).
  void getComputedStyle(root).color;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-swap"))
  );
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
