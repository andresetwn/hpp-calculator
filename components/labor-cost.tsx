"use client";

import { HardHat, Plus, Trash2 } from "lucide-react";
import { Labor } from "@/types/hpp";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NumberInput, TextInput } from "@/components/ui/form";
import { formatRupiah } from "@/lib/formatters";
import { toNumber } from "@/lib/calculations";
import { createId } from "@/lib/sample-data";

type LaborCostProps = {
  labor: Labor[];
  onChange: (labor: Labor[]) => void;
};

export function LaborCost({ labor, onChange }: LaborCostProps) {
  const addLabor = () => {
    onChange([
      ...labor,
      {
        id: createId("labor"),
        activity: "",
        workers: "",
        hours: "",
        hourlyRate: "",
      },
    ]);
  };

  const removeLabor = (id: string) => {
    onChange(labor.filter((item) => item.id !== id));
  };

  const updateLabor = (id: string, patch: Partial<Labor>) => {
    onChange(labor.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  return (
    <Card>
      <CardHeader
        title="Biaya Tenaga Kerja"
        description="Hitung biaya pekerjaan berdasarkan jumlah orang, jam kerja, dan tarif."
        icon={<HardHat className="h-5 w-5" aria-hidden="true" />}
        action={
          <Button variant="primary" size="sm" onClick={addLabor}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tambah Tenaga Kerja
          </Button>
        }
      />

      {labor.length === 0 ? (
        <EmptyState
          title="Belum ada tenaga kerja."
          description="Tambahkan aktivitas tenaga kerja untuk memperhitungkan biaya pekerja."
          actionLabel="Tambah Tenaga Kerja"
          onAction={addLabor}
        />
      ) : (
        <div className="space-y-4">
          {labor.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-2 dark:border-zinc-800 dark:bg-zinc-800/30"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Aktivitas {index + 1}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeLabor(item.id)}
                  aria-label={`Hapus aktivitas ${item.activity || index + 1}`}
                  className="h-8 px-2.5"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Hapus
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
                <TextInput
                  name={`labor-activity-${item.id}`}
                  label="Nama Pekerjaan"
                  value={item.activity}
                  placeholder="Contoh: Memasak"
                  onChange={(event) =>
                    updateLabor(item.id, { activity: event.target.value })
                  }
                  className="sm:col-span-2 lg:col-span-4"
                />
                <NumberInput
                  name={`labor-workers-${item.id}`}
                  label="Jumlah Orang"
                  value={item.workers}
                  min={0}
                  step={1}
                  onChange={(event) =>
                    updateLabor(item.id, { workers: event.target.value })
                  }
                  className="lg:col-span-3"
                />
                <NumberInput
                  name={`labor-hours-${item.id}`}
                  label="Jam Kerja"
                  value={item.hours}
                  min={0}
                  step="0.5"
                  onChange={(event) =>
                    updateLabor(item.id, { hours: event.target.value })
                  }
                  className="lg:col-span-2"
                />
                <NumberInput
                  name={`labor-rate-${item.id}`}
                  label="Tarif per Jam"
                  value={item.hourlyRate}
                  min={0}
                  step="0.01"
                  prefix={<span>Rp</span>}
                  onChange={(event) =>
                    updateLabor(item.id, { hourlyRate: event.target.value })
                  }
                  className="lg:col-span-3"
                />
                <div className="sm:col-span-2 lg:col-span-8">
                  <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Total
                  </span>
                  <p className="flex h-[42px] items-center rounded-lg border border-dashed border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50">
                    {formatRupiah(
                      Math.max(
                        0,
                        toNumber(item.workers) *
                          toNumber(item.hours) *
                          toNumber(item.hourlyRate),
                      ),
                    )}
                  </p>
                </div>
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
