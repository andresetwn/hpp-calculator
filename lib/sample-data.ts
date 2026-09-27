import { CalculatorState } from "@/types/hpp";

export const STORAGE_KEY = "hpp-calculator-state-v1";

/**
 * Data contoh (Nasi Goreng) agar pengguna langsung memahami cara kerja aplikasi.
 */
export const initialState: CalculatorState = {
  product: {
    name: "Nasi Goreng",
    quantity: 100,
    unit: "porsi",
    margin: 30,
  },
  materials: [
    { id: "mat-1", name: "Beras", quantity: 10, unit: "kg", price: 15000 },
    { id: "mat-2", name: "Telur", quantity: 20, unit: "butir", price: 2500 },
    { id: "mat-3", name: "Minyak", quantity: 2, unit: "liter", price: 18000 },
  ],
  labor: [
    {
      id: "labor-1",
      activity: "Memasak",
      workers: 1,
      hours: 4,
      hourlyRate: 20000,
    },
  ],
  overheads: [
    {
      id: "ovh-1",
      name: "Gas",
      description: "Tabung gas untuk memasak",
      amount: 30000,
    },
    {
      id: "ovh-2",
      name: "Kemasan",
      description: "Box dan plastik kemasan",
      amount: 50000,
    },
  ],
};

/**
 * Generator id aman untuk client component.
 */
export function createId(prefix: string): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `${prefix}-${random}`;
}
