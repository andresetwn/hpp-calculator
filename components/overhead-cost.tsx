"use client";

import { Lightbulb, Plus, Trash2 } from "lucide-react";
import { Overhead } from "@/types/hpp";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NumberInput, TextInput } from "@/components/ui/form";
import { createId } from "@/lib/sample-data";
import { OVERHEAD_SUGGESTIONS } from "@/lib/constants";

type OverheadCostProps = {
  overheads: Overhead[];
  onChange: (overheads: Overhead[]) => void;
};

export function OverheadCost({ overheads, onChange }: OverheadCostProps) {
  const addOverhead = (name = "") => {
    onChange([
      ...overheads,
      { id: createId("ovh"), name, description: "", amount: "" },
    ]);
  };

  const removeOverhead = (id: string) => {
    onChange(overheads.filter((item) => item.id !== id));
  };

  const updateOverhead = (id: string, patch: Partial<Overhead>) => {
    onChange(
      overheads.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    );
  };

  return (
    <Card>
      <CardHeader
        title="Biaya Overhead"
        description="Biaya penunjang produksi: listrik, gas, air, kemasan, transportasi, dan lainnya."
        icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        action={
          <Button variant="primary" size="sm" onClick={() => addOverhead()}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tambah Overhead
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {OVERHEAD_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => addOverhead(suggestion)}
            className="inline-flex h-8 items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 text-xs font-medium text-zinc-700 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
          >
            <Plus className="h-3 w-3" aria-hidden="true" />
            {suggestion}
          </button>
        ))}
      </div>

      {overheads.length === 0 ? (
        <EmptyState
          title="Belum ada biaya overhead."
          description="Tambahkan biaya overhead seperti listrik, gas, atau kemasan."
          actionLabel="Tambah Overhead"
          onAction={() => addOverhead()}
        />
      ) : (
        <div className="space-y-4">
          {overheads.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/30"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Overhead {index + 1}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeOverhead(item.id)}
                  aria-label={`Hapus overhead ${item.name || index + 1}`}
                  className="h-8 px-2.5"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Hapus
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
                <TextInput
                  name={`overhead-name-${item.id}`}
                  label="Nama Biaya"
                  value={item.name}
                  placeholder="Contoh: Listrik"
                  onChange={(event) =>
                    updateOverhead(item.id, { name: event.target.value })
                  }
                  className="sm:col-span-1 lg:col-span-3"
                />
                <TextInput
                  name={`overhead-description-${item.id}`}
                  label="Keterangan"
                  value={item.description}
                  placeholder="Opsional"
                  onChange={(event) =>
                    updateOverhead(item.id, {
                      description: event.target.value,
                    })
                  }
                  className="sm:col-span-1 lg:col-span-5"
                />
                <NumberInput
                  name={`overhead-amount-${item.id}`}
                  label="Jumlah"
                  value={item.amount}
                  min={0}
                  step="0.01"
                  prefix={<span>Rp</span>}
                  onChange={(event) =>
                    updateOverhead(item.id, { amount: event.target.value })
                  }
                  className="sm:col-span-2 lg:col-span-4"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-10 text-center dark:border-zinc-700 dark:bg-zinc-800/20">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {title}
      </p>
      <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
      <Button variant="secondary" size="sm" onClick={onAction} className="mt-4">
        <Plus className="h-4 w-4" aria-hidden="true" />
        {actionLabel}
      </Button>
    </div>
  );
}
