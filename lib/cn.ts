/**
 * clsx-like helper: gabungkan className bersyarat tanpa dependency tambahan.
 */
export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}
