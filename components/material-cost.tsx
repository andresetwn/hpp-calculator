"use client";

import { Plus, Soup, Trash2 } from "lucide-react";
import { Material } from "@/types/hpp";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NumberInput, SelectInput, TextInput } from "@/components/ui/form";
import { formatRupiah } from "@/lib/formatters";
import { toNumber } from "@/lib/calculations";
import { MATERIAL_UNITS } from "@/lib/constants";
import { createId } from "@/lib/sample-data";

type MaterialCostProps = {
  materials: Material[];
  onChange: (materials: Material[]) => void;
};

export function MaterialCost({ materials, onChange }: MaterialCostProps) {
  const addMaterial = () => {
    onChange([
      ...materials,
      { id: createId("mat"), name: "", quantity: "", unit: "kg", price: "" },
    ]);
  };

  const removeMaterial = (id: string) => {
    onChange(materials.filter((item) => item.id !== id));
  };

  const updateMaterial = (id: string, patch: Partial<Material>) => {
    onChange(
      materials.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  return (
    <Card>
      <CardHeader
        title="Biaya Bahan Baku"
        description="Tambahkan setiap bahan yang dipakai untuk membuat produk."
        icon={<Soup className="h-5 w-5" aria-hidden="true" />}
        action={
          <Button variant="primary" size="sm" onClick={addMaterial}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tambah Bahan
          </Button>
        }
      />

      {materials.length === 0 ? (
        <EmptyState
          title="Belum ada bahan baku."
          description="Tambahkan bahan untuk mulai menghitung HPP."
          actionLabel="Tambah Bahan"
          onAction={addMaterial}
        />
      ) : (
        <div className="space-y-4">
          {materials.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/30"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Bahan {index + 1}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeMaterial(item.id)}
                  aria-label={`Hapus bahan ${item.name || index + 1}`}
                  className="h-8 px-2.5"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Hapus
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
                <TextInput
                  name={`material-name-${item.id}`}
                  label="Nama Bahan"
                  value={item.name}
                  placeholder="Contoh: Beras"
                  onChange={(event) =>
                    updateMaterial(item.id, { name: event.target.value })
                  }
                  className="sm:col-span-2 lg:col-span-4"
                />
                <NumberInput
                  name={`material-quantity-${item.id}`}
                  label="Kuantitas"
                  value={item.quantity}
                  min={0}
                  step="0.01"
                  onChange={(event) =>
                    updateMaterial(item.id, { quantity: event.target.value })
                  }
                  className="lg:col-span-2"
                />
                <SelectInput
                  name={`material-unit-${item.id}`}
                  label="Satuan"
                  value={item.unit}
                  options={MATERIAL_UNITS}
                  onChange={(event) =>
                    updateMaterial(item.id, { unit: event.target.value })
                  }
                  className="lg:col-span-2"
                />
                <NumberInput
                  name={`material-price-${item.id}`}
                  label="Harga per Satuan"
                  value={item.price}
                  min={0}
                  step="0.01"
                  prefix={<span>Rp</span>}
                  onChange={(event) =>
                    updateMaterial(item.id, { price: event.target.value })
                  }
                  className="lg:col-span-3"
                />
                <div className="sm:col-span-2 lg:col-span-8">
                  <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Total
                  </span>
                  <p className="flex h-[42px] items-center rounded-lg border border-dashed border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50">
                    {formatRupiah(Math.max(0, toNumber(item.quantity) * toNumber(item.price)))}
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

function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
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
