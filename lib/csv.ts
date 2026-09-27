import { CalculatorState, HPPResult } from "@/types/hpp";
import { formatRupiah } from "@/lib/formatters";
import { toNumber } from "@/lib/calculations";
import { formatDisplayDate } from "@/lib/print";

/** BOM UTF-8 agar Excel membaca karakter Indonesia dengan benar. */
const CSV_BOM = "\uFEFF";

function csvCell(value: string | number): string {
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(cells: Array<string | number>): string {
  return cells.map(csvCell).join(",");
}

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Membangun isi CSV (laporan HPP lengkap) dari state + hasil perhitungan.
 */
export function buildCsv(state: CalculatorState, result: HPPResult): string {
  const lines: Array<string> = [];

  lines.push(
    csvRow([
      `Laporan HPP - ${state.product.name || "Produk"}`,
      formatDisplayDate(),
    ]),
  );
  lines.push(csvRow([]));

  lines.push(csvRow(["Ringkasan HPP"]));
  lines.push(
    csvRow([
      "Jumlah Produksi",
      `${result.productionQuantity} ${state.product.unit}`,
    ]),
  );
  lines.push(csvRow(["Total Bahan Baku", formatRupiah(result.totalMaterial)]));
  lines.push(csvRow(["Total Tenaga Kerja", formatRupiah(result.totalLabor)]));
  lines.push(csvRow(["Total Overhead", formatRupiah(result.totalOverhead)]));
  lines.push(csvRow(["Total HPP", formatRupiah(result.totalHPP)]));
  lines.push(csvRow(["HPP per Unit", formatRupiah(result.hppPerUnit)]));
  lines.push(csvRow(["Margin Keuntungan", `${result.margin}%`]));
  lines.push(
    csvRow(["Keuntungan per Unit", formatRupiah(result.profitPerUnit)]),
  );
  lines.push(
    csvRow(["Harga Jual per Unit", formatRupiah(result.sellingPrice)]),
  );
  lines.push(csvRow(["Total Keuntungan", formatRupiah(result.totalProfit)]));

  lines.push(csvRow([]));
  lines.push(csvRow(["Rincian Bahan Baku"]));
  lines.push(csvRow(["Nama Bahan", "Qty", "Satuan", "Harga/Satuan", "Total"]));
  state.materials.forEach((material) => {
    lines.push(
      csvRow([
        material.name,
        toNumber(material.quantity),
        material.unit,
        formatRupiah(toNumber(material.price)),
        formatRupiah(toNumber(material.quantity) * toNumber(material.price)),
      ]),
    );
  });

  lines.push(csvRow([]));
  lines.push(csvRow(["Rincian Tenaga Kerja"]));
  lines.push(csvRow(["Aktivitas", "Orang", "Jam", "Tarif/Jam", "Total"]));
  state.labor.forEach((labor) => {
    lines.push(
      csvRow([
        labor.activity,
        toNumber(labor.workers),
        toNumber(labor.hours),
        formatRupiah(toNumber(labor.hourlyRate)),
        formatRupiah(
          toNumber(labor.workers) *
            toNumber(labor.hours) *
            toNumber(labor.hourlyRate),
        ),
      ]),
    );
  });

  lines.push(csvRow([]));
  lines.push(csvRow(["Rincian Overhead"]));
  lines.push(csvRow(["Biaya", "Keterangan", "Jumlah"]));
  state.overheads.forEach((overhead) => {
    lines.push(
      csvRow([
        overhead.name,
        overhead.description,
        formatRupiah(toNumber(overhead.amount)),
      ]),
    );
  });

  return `${CSV_BOM}${lines.join("\r\n")}`;
}

/**
 * Mengunduh hasil perhitungan sebagai file CSV.
 */
export function exportToCsv(state: CalculatorState, result: HPPResult): void {
  const slug = (state.product.name || "produk")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const date = new Date().toISOString().slice(0, 10);
  download(
    buildCsv(state, result),
    `hpp-${slug}-${date}.csv`,
    "text/csv;charset=utf-8",
  );
}
