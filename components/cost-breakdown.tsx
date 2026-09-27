"use client";

import { HPPResult } from "@/types/hpp";
import { formatPercentage, formatRupiah } from "@/lib/formatters";

type CostBreakdownProps = {
  result: HPPResult;
};

type BreakdownRow = {
  name: string;
  total: number;
  percentage: number;
  colorClass: string;
  barClass: string;
};

export function CostBreakdown({ result }: CostBreakdownProps) {
  const hasData = result.totalHPP > 0;

  const rows: BreakdownRow[] = [
    {
      name: "Bahan Baku",
      total: result.totalMaterial,
      percentage: result.materialPercentage,
      colorClass: "bg-emerald-500",
      barClass: "bg-emerald-500 dark:bg-emerald-400",
    },
    {
      name: "Tenaga Kerja",
      total: result.totalLabor,
      percentage: result.laborPercentage,
      colorClass: "bg-sky-500",
      barClass: "bg-sky-500 dark:bg-sky-400",
    },
    {
      name: "Overhead",
      total: result.totalOverhead,
      percentage: result.overheadPercentage,
      colorClass: "bg-amber-500",
      barClass: "bg-amber-500 dark:bg-amber-400",
    },
  ];

  return (
    <section aria-labelledby="breakdown-title" className="space-y-4">
      <div>
        <h2
          id="breakdown-title"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Breakdown Biaya
        </h2>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          Komposisi biaya penyusun HPP {result.totalHPP > 0 ? "produk Anda" : ""}.
        </p>
      </div>

      {hasData ? (
        <>
          {/* Stacked bar komposisi biaya */}
          <div>
            <div
              className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
              role="img"
              aria-label={`Komposisi biaya: Bahan Baku ${formatPercentage(
                result.materialPercentage,
              )}, Tenaga Kerja ${formatPercentage(
                result.laborPercentage,
              )}, Overhead ${formatPercentage(result.overheadPercentage)}.`}
            >
              {rows.map((row) =>
                row.percentage > 0 ? (
                  <div
                    key={row.name}
                    className={row.colorClass}
                    style={{ width: `${row.percentage}%` }}
                  />
                ) : null,
              )}
            </div>
          </div>

          <ol className="space-y-3">
            {rows.map((row) => (
              <li key={row.name}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-300">
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 rounded-full ${row.barClass}`}
                    />
                    {row.name}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {formatPercentage(row.percentage)}
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className={`h-full rounded-full ${row.barClass} transition-all`}
                    style={{ width: `${Math.min(row.percentage, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-zinc-500 dark:text-zinc-400">
                  {formatRupiah(row.total)}
                </p>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/20 dark:text-zinc-400">
          Belum ada biaya yang dihitung.
          <br />
          Tambahkan bahan baku, tenaga kerja, atau overhead untuk melihat
          breakdown biaya.
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            Tabel breakdown biaya HPP per komponen
          </caption>
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-left dark:border-zinc-800 dark:bg-zinc-800/50">
              <th scope="col" className="px-4 py-2.5 font-semibold text-zinc-700 dark:text-zinc-300">
                Komponen
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                Total
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                Persentase
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/60"
              >
                <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">
                  {row.name}
                </td>
<td className="px-4 py-2.5 text-right font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                  {formatRupiah(row.total)}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {formatPercentage(row.percentage)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
              <th scope="row" className="px-4 py-2.5 font-semibold text-zinc-900 dark:text-zinc-50">
                Total HPP
              </th>
              <td className="px-4 py-2.5 text-right font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                {formatRupiah(result.totalHPP)}
              </td>
              <td className="px-4 py-2.5 text-right font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                100%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
