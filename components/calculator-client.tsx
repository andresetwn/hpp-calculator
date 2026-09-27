"use client";

import { useState } from "react";
import { Labor, Material, Overhead, ProductInfo } from "@/types/hpp";
import { useCalculator } from "@/lib/use-calculator";
import { ProductForm } from "@/components/product-form";
import { MaterialCost } from "@/components/material-cost";
import { LaborCost } from "@/components/labor-cost";
import { OverheadCost } from "@/components/overhead-cost";
import { CalculationSummary } from "@/components/calculation-summary";
import { CostBreakdown } from "@/components/cost-breakdown";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function CalculatorClient() {
  const { state, setState, result, reset } = useCalculator();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const updateProduct = (product: ProductInfo) => {
    setState({ ...state, product });
  };

  const updateMaterials = (materials: Material[]) => {
    setState({ ...state, materials });
  };

  const updateLabor = (labor: Labor[]) => {
    setState({ ...state, labor });
  };

  const updateOverheads = (overheads: Overhead[]) => {
    setState({ ...state, overheads });
  };

  const confirmReset = () => {
    reset();
    setResetDialogOpen(false);
  };

  return (
    <div
      id="kalkulator"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          Kalkulator HPP
        </h2>
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-300">
          Masukkan komponen biaya Anda. Total HPP, HPP per unit, dan estimasi
          harga jual dihitung otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
        <div className="space-y-6 lg:col-span-3">
          <ProductForm
            product={state.product}
            onChange={updateProduct}
            errors={result.errors}
          />
          <MaterialCost
            materials={state.materials}
            onChange={updateMaterials}
          />
          <LaborCost labor={state.labor} onChange={updateLabor} />
          <OverheadCost
            overheads={state.overheads}
            onChange={updateOverheads}
          />
        </div>

        <div className="lg:sticky lg:top-20 lg:col-span-2 lg:self-start">
          <div className="print-area rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <CalculationSummary
              state={state}
              result={result}
              onReset={() => setResetDialogOpen(true)}
            />
            <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <CostBreakdown result={result} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={resetDialogOpen}
        title="Reset kalkulator?"
        description="Seluruh input akan dikembalikan ke kondisi awal (data contoh). Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, reset"
        cancelLabel="Batal"
        onConfirm={confirmReset}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  );
}
