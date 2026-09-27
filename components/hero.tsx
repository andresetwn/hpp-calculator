import { ArrowRight, Calculator, ShieldCheck, Wallet } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-emerald-50 to-white dark:border-zinc-800 dark:from-emerald-950/40 dark:to-zinc-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Kalkulator HPP Gratis
          </span>
          <h1
            id="hero-title"
            className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl"
          >
            Hitung HPP Produk dengan Mudah
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
            Kelola biaya bahan baku, tenaga kerja, dan overhead untuk
            mengetahui HPP dan estimasi harga jual produk.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#kalkulator"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 sm:w-auto"
            >
              Mulai Menghitung
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#panduan"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 text-base font-medium text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:w-auto"
            >
              Pelajari HPP
            </a>
          </div>
        </div>
        <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Calculator, label: "3 Komponen Biaya", value: "Bahan, Tenaga Kerja, Overhead" },
            { icon: Wallet, label: "Harga Jual Otomatis", value: "Berdasarkan margin keuntungan" },
            { icon: ShieldCheck, label: "Data Aman", value: "Tersimpan di perangkat Anda" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-zinc-200 bg-white/70 p-4 text-left dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <item.icon
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <dt className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
