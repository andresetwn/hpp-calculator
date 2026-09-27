"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { ThemeMode } from "@/types/hpp";

const THEME_STORAGE_KEY = "hpp-calculator-theme";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function subscribe(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  if (!isBrowser()) return "";
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return "";
}

function resolveTheme(stored: string): ThemeMode | null {
  if (stored === "dark" || stored === "light") return stored;
  return null;
}

/**
 * Theme toggle dengan class `dark` di <html> + localStorage.
 * SSR-safe: nilai awal diambil dari `useSyncExternalStore` (server selalu
 * "light"), lalu sinkron dengan localStorage/preferensi sistem tanpa
 * hydration mismatch.
 */
export function useTheme(): {
  theme: ThemeMode;
  toggleTheme: () => void;
  mounted: boolean;
} {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const theme: ThemeMode = (() => {
    const storedTheme = resolveTheme(stored);
    if (storedTheme) return storedTheme;
    if (!isClient) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  })();

  useEffect(() => {
    if (!isClient) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, isClient]);

  const toggleTheme = useCallback(() => {
    if (!isBrowser()) return;
    const next = theme === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // localStorage tidak tersedia — hanya update class root.
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  }, [theme]);

  return { theme, toggleTheme, mounted: isClient };
}
