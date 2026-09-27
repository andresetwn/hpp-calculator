import { Calculator, Heart, MapPin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950"
            >
              <Calculator className="h-4 w-4" aria-hidden="true" />
            </span>
            HPP Calculator
          </div>
          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <a
                  href="#kalkulator"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Kalkulator
                </a>
              </li>
              <li>
                <a
                  href="#panduan"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Panduan
                </a>
              </li>
            </ul>
          </nav>
          <a className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Tangerang, Indonesia
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          © {year} HPP Calculator. Dibuat dengan{" "}
          <Heart
            color="#3b82f6"
            className="inline h-3 w-3 text-red-500"
            aria-hidden="true"
          />{" "}
          oleh andrestwn.
        </p>
      </div>
    </footer>
  );
}
