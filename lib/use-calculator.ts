"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { CalculatorState } from "@/types/hpp";
import { calculateHPP } from "@/lib/calculations";
import { STORAGE_KEY, initialState } from "@/lib/sample-data";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function subscribe(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  if (!isBrowser()) return JSON.stringify(initialState);
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return JSON.stringify(initialState);
}

function parseSnapshot(snapshot: string): CalculatorState {
  if (!snapshot) return initialState;
  try {
    const parsed = JSON.parse(snapshot) as Partial<CalculatorState>;
    return {
      product: normalizeProduct(parsed.product),
      materials: Array.isArray(parsed.materials)
        ? parsed.materials
            .map(normalizeMaterial)
            .filter((item): item is NonNullable<typeof item> => item !== null)
        : initialState.materials,
      labor: Array.isArray(parsed.labor)
        ? parsed.labor
            .map(normalizeLabor)
            .filter((item): item is NonNullable<typeof item> => item !== null)
        : initialState.labor,
      overheads: Array.isArray(parsed.overheads)
        ? parsed.overheads
            .map(normalizeOverhead)
            .filter((item): item is NonNullable<typeof item> => item !== null)
        : initialState.overheads,
    };
  } catch {
    return initialState;
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Jumlah produksi & margin tidak boleh negatif; satuan default bila kosong.
 * String mentah dari input dipertahankan apa adanya (diparse di lapisan
 * perhitungan) agar pengguna bebas mengetik "1.500" tanpa nilai berubah.
 */
function normalizeProduct(
  product: unknown,
): CalculatorState["product"] {
  const base = initialState.product;
  if (!product || typeof product !== "object") return base;
  const raw = product as Partial<CalculatorState["product"]>;
  return {
    name: typeof raw.name === "string" ? raw.name : base.name,
    quantity: clampFinite(raw.quantity, String(base.quantity)),
    unit: isNonEmptyString(raw.unit) ? raw.unit : base.unit,
    margin: clampFinite(raw.margin, String(base.margin)),
  };
}

function rowId(value: unknown, prefix: string, index: number): string {
  return isNonEmptyString(value) ? (value as string) : `${prefix}-${index}`;
}

type NumericInput = number | string;

/** Pertahankan string mentah; numerik lama dijatuhkan ke fallback bila NaN. */
function clampFinite(value: unknown, fallback: NumericInput): NumericInput {
  if (typeof value === "string") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  return fallback;
}

function nonNegative(value: NumericInput): NumericInput {
  if (typeof value === "string") return value;
  return Math.max(0, value);
}

function normalizeMaterial(
  item: unknown,
  index: number,
): CalculatorState["materials"][number] | null {
  if (!item || typeof item !== "object") return null;
  const raw = item as Partial<CalculatorState["materials"][number]>;
  return {
    id: rowId(raw.id, "mat", index),
    name: typeof raw.name === "string" ? raw.name : "",
    quantity: clampFinite(raw.quantity, 0),
    unit: isNonEmptyString(raw.unit) ? raw.unit : "kg",
    price: nonNegative(clampFinite(raw.price, 0)),
  };
}

function normalizeLabor(
  item: unknown,
  index: number,
): CalculatorState["labor"][number] | null {
  if (!item || typeof item !== "object") return null;
  const raw = item as Partial<CalculatorState["labor"][number]>;
  return {
    id: rowId(raw.id, "labor", index),
    activity: typeof raw.activity === "string" ? raw.activity : "",
    workers: nonNegative(clampFinite(raw.workers, 0)),
    hours: nonNegative(clampFinite(raw.hours, 0)),
    hourlyRate: nonNegative(clampFinite(raw.hourlyRate, 0)),
  };
}

function normalizeOverhead(
  item: unknown,
  index: number,
): CalculatorState["overheads"][number] | null {
  if (!item || typeof item !== "object") return null;
  const raw = item as Partial<CalculatorState["overheads"][number]>;
  return {
    id: rowId(raw.id, "ovh", index),
    name: typeof raw.name === "string" ? raw.name : "",
    description: typeof raw.description === "string" ? raw.description : "",
    amount: nonNegative(clampFinite(raw.amount, 0)),
  };
}

/**
 * State kalkulator + persistensi localStorage + hasil perhitungan memoized.
 * SSR-safe: server merender `initialState`, client melakukan sinkronisasi
 * dengan localStorage melalui `useSyncExternalStore` (tanpa hydration mismatch).
 */
export function useCalculator() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const state = useMemo(() => parseSnapshot(snapshot), [snapshot]);

  const setState = useCallback((next: CalculatorState) => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Storage penuh / tidak tersedia — abaikan.
    }
  }, []);

  const result = useMemo(
    () =>
      calculateHPP(
        state.product,
        state.materials,
        state.labor,
        state.overheads,
      ),
    [state.product, state.materials, state.labor, state.overheads],
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, [setState]);

  return { state, setState, result, reset };
}
