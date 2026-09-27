"use client";

import { AlertCircle, RotateCcw, Download, Printer, TrendingUp } from "lucide-react";
import { ReactNode, useCallback } from "react";
import { CalculatorState, HPPResult } from "@/types/hpp";
import { formatNumber, formatPercentage, formatRupiah } from "@/lib/formatters";
import { exportToCsv } from "@/lib/csv";
import { formatDisplayDate, printElement } from "@/lib/print";
import { Button } from "@/components/ui/button";

type CalculationSummaryProps = {
  state: CalculatorState;
  result: HPPResult;
  onReset: () => void;
};

export function CalculationSummary({
  state,
  result,
  onReset,
}: CalculationSummaryProps) {
  const handleExport = useCallback(() => {
    exportToCsv(state, result);
  }, [state, result]);

  const handlePrint = useCallback(() => {
    printElement("#hpp-report");
  }, []);

  return (
    <section
      id="hpp-report"
      aria-labelledby="summary-title"
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <h2
          id="summary-title"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Ringkasan HPP
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </Button>
          <Button variant="secondary" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Cetak Hasil
          </Button>
          <Button variant="danger" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset Kalkulator
          </Button>
        </div>
      </div>

      {/* Header laporan: hanya tampil saat dicetak. */}
      <div className="hidden print-only-block">
        <h2 className="text-xl font-bold text-zinc-900">
          Laporan HPP - {state.product.name || "Produk"}
        </h2>
        <p className="text-sm text-zinc-600">{formatDisplayDate()}</p>
      </div>

      {result.errors.length > 0 ? (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 no-print dark:border-amber-500/30 dark:bg-amber-500/10"
        >
          <AlertCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              Perhatikan input berikut:
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm text-amber-700 dark:text-amber-300/90">
              {result.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <SummaryCard
          label="Total Bahan Baku"
          value={formatRupiah(result.totalMaterial)}
          percentage={result.materialPercentage}
        />
        <SummaryCard
          label="Total Tenaga Kerja"
          value={formatRupiah(result.totalLabor)}
          percentage={result.laborPercentage}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <SummaryCard
          label="Total Overhead"
          value={formatRupiah(result.totalOverhead)}
          percentage={result.overheadPercentage}
          icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}
        />
        <SummaryCard
          label="Produksi"
          value={`${formatNumber(result.productionQuantity)} ${state.product.unit}`}
        />
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Total HPP
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-300 sm:text-3xl">
              {formatRupiah(result.totalHPP)}
            </p>
          </div>
          <div className="sm:border-l sm:border-emerald-300 sm:pl-4 dark:sm:border-emerald-500/30">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              HPP per Unit
            </p>
            <p
              className="mt-1 text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-300 sm:text-3xl"
              title={result.hasPendingInput ? "Selesaikan penulisan angka di input" : undefined}
            >
              {formatRupiah(result.hppPerUnit)}
              {result.hasPendingInput ? (
                <span
                  className="ml-1 align-middle text-sm font-normal text-emerald-600/70 dark:text-emerald-400/70"
                  aria-hidden="true"
                >
                  …
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Margin Keuntungan
            </p>
            <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {formatPercentage(result.margin)}
            </p>
          </div>
          <div className="border-l border-zinc-200 pl-4 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Keuntungan per Unit
            </p>
            <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {formatRupiah(result.profitPerUnit)}
            </p>
          </div>
        </div>
        <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Estimasi Harga Jual per Unit
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-3xl">
            {formatRupiah(result.sellingPrice)}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Total keuntungan: {formatRupiah(result.totalProfit)} (
            {formatNumber(result.productionQuantity)} {state.product.unit})
          </p>
        </div>
      </div>
    </section>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  percentage?: number;
  icon?: ReactNode;
};

function SummaryCard({ label, value, percentage, icon }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      </div>
      <p className="mt-1.5 text-lg font-bold text-zinc-900 dark:text-zinc-50 sm:text-xl">
        {value}
      </p>
      {percentage !== undefined ? (
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {formatPercentage(percentage)} dari total HPP
        </p>
      ) : null}
    </div>
  );
}
