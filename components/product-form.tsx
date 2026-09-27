"use client";

import { Package } from "lucide-react";
import { ProductInfo } from "@/types/hpp";
import { Card, CardHeader } from "@/components/ui/card";
import { NumberInput, SelectInput, TextInput } from "@/components/ui/form";
import { PRODUCT_UNITS } from "@/lib/constants";

type ProductFormProps = {
  product: ProductInfo;
  onChange: (product: ProductInfo) => void;
  errors: string[];
};

export function ProductForm({ product, onChange, errors }: ProductFormProps) {
  const errorFor = (field: string) =>
    errors.find((error) => error.toLowerCase().includes(field));

  return (
    <Card id="informasi-produk">
      <CardHeader
        title="Informasi Produk"
        description="Data dasar produk yang akan dihitung HPP-nya."
        icon={<Package className="h-5 w-5" aria-hidden="true" />}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <TextInput
          name="product-name"
          label="Nama Produk"
          value={product.name}
          placeholder="Contoh: Nasi Goreng"
          onChange={(event) =>
            onChange({ ...product, name: event.target.value })
          }
          error={errorFor("nama")}
          className="sm:col-span-2 lg:col-span-6"
        />
        <NumberInput
          name="product-quantity"
          label="Jumlah Produksi"
          value={product.quantity}
          min={0}
          step={1}
          placeholder="0"
          onChange={(event) =>
            onChange({ ...product, quantity: event.target.value })
          }
          error={errorFor("jumlah")}
          className="lg:col-span-3"
        />
        <SelectInput
          name="product-unit"
          label="Satuan Produk"
          value={product.unit}
          options={PRODUCT_UNITS}
          onChange={(event) => onChange({ ...product, unit: event.target.value })}
          className="lg:col-span-3"
        />
        <NumberInput
          name="product-margin"
          label="Margin Keuntungan (%)"
          value={product.margin}
          min={0}
          step={1}
          prefix={<span>%</span>}
          hint="Contoh: 30 artinya menambah 30% dari HPP per unit."
          onChange={(event) =>
            onChange({ ...product, margin: event.target.value })
          }
          error={errorFor("margin")}
          className="sm:col-span-2 lg:col-span-12"
        />
      </div>
    </Card>
  );
}
