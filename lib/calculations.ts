import { Labor, Material, Overhead, ProductInfo, HPPResult } from "@/types/hpp";

/**
 * Biaya bahan baku = Σ (kuantitas × harga per satuan)
 */
export function calculateMaterialCost(materials: Material[]): number {
  return materials.reduce((total, item) => {
    return total + toNumber(item.quantity) * toNumber(item.price);
  }, 0);
}

/**
 * Biaya tenaga kerja = Σ (jumlah orang × jam kerja × tarif per jam)
 */
export function calculateLaborCost(labor: Labor[]): number {
  return labor.reduce((total, item) => {
    return (
      total +
      toNumber(item.workers) * toNumber(item.hours) * toNumber(item.hourlyRate)
    );
  }, 0);
}

/**
 * Total overhead = Σ seluruh biaya overhead
 */
export function calculateOverheadCost(overheads: Overhead[]): number {
  return overheads.reduce((total, item) => {
    return total + toNumber(item.amount);
  }, 0);
}

/**
 * Total HPP = bahan baku + tenaga kerja + overhead.
 * Nilai negatif dibuang: input tidak valid tidak boleh mengurangi total.
 */
export function calculateTotalHPP(
  materials: Material[],
  labor: Labor[],
  overheads: Overhead[],
): number {
  return (
    Math.max(0, calculateMaterialCost(materials)) +
    Math.max(0, calculateLaborCost(labor)) +
    Math.max(0, calculateOverheadCost(overheads))
  );
}

/**
 * HPP per unit = total HPP ÷ jumlah produksi
 */
export function calculateHPPPerUnit(totalHPP: number, quantity: number): number {
  const qty = toNumber(quantity);
  if (qty <= 0) return 0;
  return totalHPP / qty;
}

/**
 * Keuntungan per unit = HPP per unit × (margin / 100)
 */
export function calculateProfit(hppPerUnit: number, margin: number): number {
  return hppPerUnit * (toNumber(margin) / 100);
}

/**
 * Harga jual per unit = HPP per unit × (1 + margin/100)
 */
export function calculateSellingPrice(hppPerUnit: number, margin: number): number {
  return hppPerUnit * (1 + toNumber(margin) / 100);
}

/**
 * Persentase komponen biaya terhadap total HPP.
 * Tidak pernah negatif dan tidak melebihi 100%.
 */
export function calculateCostPercentage(
  component: number,
  total: number,
): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, (component / total) * 100));
}

/**
 * True bila sebuah nilai masih berupa teks "mentah" yang belum complete
 * (contoh: "1." yang belum jadi "1.500"). Dipakai agar angka di summary
 * tidak berkedip ke nilai parsial saat pengguna mengetik pemisah ribuan.
 */
export function isPendingNumber(value: number | string): boolean {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed === "") return false;
  return /[.,]$/.test(trimmed);
}

export function validateCalculator(
  product: ProductInfo,
  materials: Material[],
  labor: Labor[],
  overheads: Overhead[],
): string[] {
  const errors: string[] = [];

  if (!product.name.trim()) {
    errors.push("Nama produk tidak boleh kosong.");
  }
  if (!(toNumber(product.quantity) > 0)) {
    errors.push("Jumlah produksi harus lebih dari 0.");
  }
  if (toNumber(product.margin) < 0) {
    errors.push("Margin keuntungan tidak boleh negatif.");
  }

  // Aturan per item:
  // - baris yang belum disentuh sama sekali (tanpa nama & tanpa nilai) diabaikan;
  // - nilai negatif selalu error;
  // - sudah diisi nilainya tapi nama masih kosong dianggap belum lengkap.
  const invalidMaterial = materials.some((item) => {
    const qty = toNumber(item.quantity);
    const price = toNumber(item.price);
    const hasName = item.name.trim().length > 0;
    const hasValue = qty > 0 || price > 0;
    if (qty < 0 || price < 0) return true;
    return hasValue && !hasName;
  });
  if (invalidMaterial) {
    errors.push("Ada bahan baku dengan data tidak valid.");
  }

  const invalidLabor = labor.some((item) => {
    const workers = toNumber(item.workers);
    const hours = toNumber(item.hours);
    const rate = toNumber(item.hourlyRate);
    const hasActivity = item.activity.trim().length > 0;
    const hasValue = workers > 0 || hours > 0 || rate > 0;
    if (workers < 0 || hours < 0 || rate < 0) return true;
    return hasValue && !hasActivity;
  });
  if (invalidLabor) {
    errors.push("Ada tenaga kerja dengan data tidak valid.");
  }

  const invalidOverhead = overheads.some((item) => {
    const amount = toNumber(item.amount);
    if (amount < 0) return true;
    return false;
  });
  if (invalidOverhead) {
    errors.push("Biaya overhead tidak boleh negatif.");
  }

  return errors;
}

export function calculateHPP(
  product: ProductInfo,
  materials: Material[],
  labor: Labor[],
  overheads: Overhead[],
): HPPResult {
  const totalMaterial = Math.max(0, calculateMaterialCost(materials));
  const totalLabor = Math.max(0, calculateLaborCost(labor));
  const totalOverhead = Math.max(0, calculateOverheadCost(overheads));
  const totalHPP = totalMaterial + totalLabor + totalOverhead;
  const productionQuantity = toNumber(product.quantity);
  const hppPerUnit = calculateHPPPerUnit(totalHPP, productionQuantity);
  const margin = toNumber(product.margin);
  const profitPerUnit = calculateProfit(hppPerUnit, margin);
  const sellingPrice = calculateSellingPrice(hppPerUnit, margin);
  const totalProfit = profitPerUnit * (productionQuantity > 0 ? productionQuantity : 0);

  const hasPendingInput =
    isPendingNumber(product.quantity) ||
    isPendingNumber(product.margin) ||
    materials.some(
      (item) => isPendingNumber(item.quantity) || isPendingNumber(item.price),
    ) ||
    labor.some(
      (item) =>
        isPendingNumber(item.workers) ||
        isPendingNumber(item.hours) ||
        isPendingNumber(item.hourlyRate),
    ) ||
    overheads.some((item) => isPendingNumber(item.amount));

  return {
    totalMaterial,
    totalLabor,
    totalOverhead,
    totalHPP,
    productionQuantity,
    hppPerUnit,
    margin,
    profitPerUnit,
    sellingPrice,
    totalProfit,
    materialPercentage: calculateCostPercentage(totalMaterial, totalHPP),
    laborPercentage: calculateCostPercentage(totalLabor, totalHPP),
    overheadPercentage: calculateCostPercentage(totalOverhead, totalHPP),
    hasPendingInput,
    errors: validateCalculator(product, materials, labor, overheads),
  };
}

/**
 * Parse format Indonesia: titik = pemisah ribuan ("1.500.000"), koma = desimal ("1.500,50").
 * Tetap mengenali format en-US ("1,500,000.50") sebagai fallback.
 */
function parseNumericString(raw: string): number {
  const cleaned = raw.replace(/[^0-9,.-]/g, "");
  if (!cleaned) return 0;

  const sign = cleaned.startsWith("-") ? -1 : 1;
  const digits = cleaned.replace(/-/g, "");
  const hasComma = digits.includes(",");
  const hasDot = digits.includes(".");

  const decimalSplit = (intPart: string, frac: string) => {
    const intDigits = intPart.replace(/[^0-9]/g, "");
    const fracDigits = frac.replace(/[^0-9]/g, "");
    return Number.parseFloat(fracDigits ? `${intDigits}.${fracDigits}` : intDigits);
  };

  if (hasComma && hasDot) {
    // Pemisah terakhir adalah pemisah desimal; sisanya dianggap ribuan.
    const lastComma = digits.lastIndexOf(",");
    const lastDot = digits.lastIndexOf(".");
    if (lastComma > lastDot) {
      return sign * decimalSplit(digits.slice(0, lastComma), digits.slice(lastComma + 1));
    }
    return sign * decimalSplit(digits.slice(0, lastDot), digits.slice(lastDot + 1));
  }

  if (hasComma) {
    const parts = digits.split(",");
    // "1,5" atau "1,50" -> desimal; "1,500" -> ribuan (en-US).
    if (parts.length === 2 && parts[1].length <= 2) {
      return sign * decimalSplit(parts[0], parts[1]);
    }
    return sign * Number.parseFloat(parts.join(""));
  }

  if (hasDot) {
    const parts = digits.split(".");
    // "1,5" atau "1.50" -> desimal; "1.500" / "1.500.000" -> ribuan (id-ID).
    if (parts.length === 2 && parts[1].length <= 2) {
      return sign * decimalSplit(parts[0], parts[1]);
    }
    return sign * Number.parseFloat(parts.join(""));
  }

  const parsed = Number.parseFloat(digits);
  return Number.isFinite(parsed) ? sign * parsed : 0;
}

/**
 * Mengubah input apa pun (string, number, NaN, undefined) menjadi number aman.
 * Catatan: nilai numerik dari <input type="number"> sudah berupa number,
 * jadi fungsi ini terutama fallback defensif untuk data dari localStorage
 * maupun string buatan pengguna.
 */
export function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  if (typeof value === "string") {
    const parsed = parseNumericString(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}
