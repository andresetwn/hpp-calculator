import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

function fieldClassName(extra?: string): string {
  return [
    "w-full rounded-lg border bg-white px-3 py-2.5 text-zinc-900 shadow-sm transition-colors",
    "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
    "border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50",
    "focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30",
    "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/30",
    extra ?? "",
  ].join(" ");
}

function Hint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
      {children}
    </p>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p
      id={id}
      className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
    >
      {children}
    </p>
  );
}

function describedById(
  id: string,
  error?: string,
  hint?: ReactNode,
): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/**
 * Opsi dropdown + nilai yang tersimpan. Bila nilai (mis. dari localStorage
 * versi lama) tidak ada di daftar, opsi tambahan disisipkan agar data
 * pengguna tidak hilang.
 */
function selectOptions(value: string, options: readonly string[]): string[] {
  return options.includes(value) ? [...options] : [value, ...options];
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: ReactNode;
  inputClassName?: string;
};

export function TextInput({
  className,
  inputClassName,
  id,
  name,
  label,
  error,
  hint,
  ...props
}: TextInputProps) {
  const inputId = id ?? name ?? "";
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedById(inputId, error, hint)}
        className={fieldClassName(inputClassName)}
        {...props}
      />
      {hint && !error ? <Hint id={`${inputId}-hint`}>{hint}</Hint> : null}
      {error ? <ErrorText id={`${inputId}-error`}>{error}</ErrorText> : null}
    </div>
  );
}

type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
  label: string;
  prefix?: ReactNode;
  error?: string;
  hint?: ReactNode;
  inputClassName?: string;
};

/** Hanya boleh diisi angka, titik, koma, dan tanda minus di posisi awal. */
function sanitizeNumericInput(value: string): string {
  const allowMinus = value.startsWith("-");
  const digits = value.replace(/[^0-9.,]/g, "");
  return allowMinus ? `-${digits}` : digits;
}

export function NumberInput({
  className,
  inputClassName,
  id,
  name,
  label,
  prefix,
  error,
  hint,
  onChange,
  ...props
}: NumberInputProps) {
  const inputId = id ?? name ?? "";
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-zinc-500 dark:text-zinc-400"
          >
            {prefix}
          </span>
        ) : null}
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedById(inputId, error, hint)}
          className={fieldClassName(inputClassName ?? (prefix ? "pl-11" : undefined))}
          onChange={(event) => {
            const sanitized = sanitizeNumericInput(event.target.value);
            if (sanitized !== event.target.value) {
              event.target.value = sanitized;
            }
            onChange?.(event);
          }}
          {...props}
        />
      </div>
      {hint && !error ? <Hint id={`${inputId}-hint`}>{hint}</Hint> : null}
      {error ? <ErrorText id={`${inputId}-error`}>{error}</ErrorText> : null}
    </div>
  );
}

type SelectInputProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label: string;
  options: readonly string[];
  error?: string;
  hint?: ReactNode;
  inputClassName?: string;
};

export function SelectInput({
  className,
  inputClassName,
  id,
  name,
  label,
  options,
  error,
  hint,
  value,
  ...props
}: SelectInputProps) {
  const selectId = id ?? name ?? "";
  return (
    <div className={className}>
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedById(selectId, error, hint)}
        className={fieldClassName(inputClassName)}
        {...props}
      >
        {selectOptions(String(value ?? ""), options).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {hint && !error ? <Hint id={`${selectId}-hint`}>{hint}</Hint> : null}
      {error ? <ErrorText id={`${selectId}-error`}>{error}</ErrorText> : null}
    </div>
  );
}
