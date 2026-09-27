export function formatDisplayDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(date);
}

/**
 * Membuka dialog cetak browser untuk isi `selector` saja.
 * CSS print di app/globals.css (`.print-area`) yang menentukan area cetak;
 * fungsi ini hanya memaksa mode terang saat dicetak dan membersihkannya
 * setelah selesai.
 */
export function printElement(selector: string): boolean {
  if (typeof window === "undefined") return false;
  const el = document.querySelector(selector);
  if (!el) return false;

  document.documentElement.classList.add("hpp-printing");

  const cleanup = () => {
    document.documentElement.classList.remove("hpp-printing");
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  setTimeout(cleanup, 30_000);

  window.print();
  return true;
}
