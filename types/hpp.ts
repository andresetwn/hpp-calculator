export interface Material {
  id: string;
  name: string;
  quantity: number | string;
  unit: string;
  price: number | string;
}

export interface Labor {
  id: string;
  activity: string;
  workers: number | string;
  hours: number | string;
  hourlyRate: number | string;
}

export interface Overhead {
  id: string;
  name: string;
  description: string;
  amount: number | string;
}

export interface ProductInfo {
  name: string;
  quantity: number | string;
  unit: string;
  margin: number | string;
}

export interface HPPResult {
  totalMaterial: number;
  totalLabor: number;
  totalOverhead: number;
  totalHPP: number;
  productionQuantity: number;
  hppPerUnit: number;
  margin: number;
  profitPerUnit: number;
  sellingPrice: number;
  totalProfit: number;
  materialPercentage: number;
  laborPercentage: number;
  overheadPercentage: number;
  /** True bila ada input angka yang sedang diedit (mis. "1.5") dan belum valid. */
  hasPendingInput: boolean;
  errors: string[];
}

export type ThemeMode = "light" | "dark";

export interface CalculatorState {
  product: ProductInfo;
  materials: Material[];
  labor: Labor[];
  overheads: Overhead[];
}
