const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2,
});

/**
 * Format nilai ke format Rupiah Indonesia, contoh: `Rp 1.500.000`.
 */
export function formatRupiah(value: number): string {
  if (!Number.isFinite(value)) return rupiahFormatter.format(0);
  return rupiahFormatter.format(Math.round(value));
}

/**
 * Format angka dengan pemisah ribuan Indonesia, contoh: `1.500`.
 */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return numberFormatter.format(0);
  return numberFormatter.format(value);
}

/**
 * Persentase dengan satu angka di belakang koma, contoh: `55,5%`.
 */
export function formatPercentage(value: number): string {
  if (!Number.isFinite(value)) return "0%";
  return `${numberFormatter.format(value)}%`;
}

/**
 * Label persentase pembulatan untuk aria-label chart.
 */
export function formatRoundedPercentage(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value);
}
