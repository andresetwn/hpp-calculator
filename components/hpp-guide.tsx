import { BookOpen, Boxes, HardHat, Lightbulb, Calculator } from "lucide-react";

export function HppGuide() {
  return (
    <section
      id="panduan"
      aria-labelledby="panduan-title"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Panduan HPP
          </span>
          <h2
            id="panduan-title"
            className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Apa itu HPP?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            HPP (Harga Pokok Penjualan) adalah total biaya yang dikeluarkan untuk
            menghasilkan suatu produk, yang nantinya digunakan sebagai dasar
            untuk menentukan harga jual.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <GuideCard
            icon={<Boxes className="h-5 w-5" aria-hidden="true" />}
            title="1. Bahan Baku"
            description="Seluruh bahan yang dipakai untuk membuat produk, misalnya beras, telur, dan minyak."
          />
          <GuideCard
            icon={<HardHat className="h-5 w-5" aria-hidden="true" />}
            title="2. Tenaga Kerja"
            description="Biaya pekerja yang terlibat dalam produksi, dihitung dari jumlah orang, jam kerja, dan tarif."
          />
          <GuideCard
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
            title="3. Overhead"
            description="Biaya penunjang produksi seperti listrik, gas, air, kemasan, transportasi, dan penyusutan."
          />
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            Rumus Perhitungan
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <Formula
              label="Total HPP"
              formula="Bahan Baku + Tenaga Kerja + Overhead"
            />
            <Formula
              label="HPP per Unit"
              formula="Total HPP ÷ Jumlah Produksi"
            />
            <Formula
              label="Harga Jual"
              formula="HPP per Unit × (1 + Margin/100)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type GuideCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function GuideCard({ icon, title, description }: GuideCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
      >
        {icon}
      </span>
      <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}

type FormulaProps = {
  label: string;
  formula: string;
};

function Formula({ label, formula }: FormulaProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/40">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-zinc-900 dark:text-zinc-50">
        {formula}
      </p>
    </div>
  );
}
