# Prompt Pembuatan Website Kalkulator HPP

Buat sebuah website **Kalkulator HPP (Harga Pokok Penjualan)** modern, responsif, dan mudah digunakan menggunakan:

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- Gunakan komponen React yang reusable dan struktur project yang rapi.
- Tidak perlu backend/database untuk versi awal; seluruh perhitungan dapat dilakukan di client-side.

## 1. Tujuan Website

Website digunakan untuk membantu pengguna menghitung **Harga Pokok Penjualan (HPP)** sebuah produk berdasarkan komponen biaya yang dimasukkan pengguna.

Website harus cocok untuk:
- UMKM
- Penjual online
- Pemilik bisnis kecil
- Mahasiswa yang sedang mempelajari perhitungan HPP
- Pengguna yang ingin mengetahui biaya produksi dan harga jual produk

Fokus utama website adalah **kemudahan penggunaan, kejelasan perhitungan, dan tampilan profesional**.

---

## 2. Konsep Perhitungan

Sediakan kalkulator dengan komponen utama:

### A. Biaya Bahan Baku

Pengguna dapat menambahkan beberapa bahan.

Setiap item memiliki:
- Nama bahan
- Kuantitas
- Satuan
- Harga per satuan
- Total biaya

Rumus:

`Total Bahan Baku = Σ (Kuantitas × Harga per Satuan)`

### B. Biaya Tenaga Kerja

Sediakan input:
- Nama pekerjaan/aktivitas
- Jumlah orang
- Jam kerja
- Tarif per jam

Rumus:

`Biaya Tenaga Kerja = Jumlah Orang × Jam Kerja × Tarif per Jam`

Pengguna dapat menambahkan beberapa aktivitas tenaga kerja.

### C. Biaya Overhead

Sediakan input untuk biaya overhead seperti:
- Listrik
- Gas
- Air
- Kemasan
- Transportasi
- Penyusutan
- Biaya lainnya

Pengguna dapat menambahkan beberapa item overhead.

Rumus:

`Total Overhead = Σ seluruh biaya overhead`

### D. Total HPP

Hitung secara otomatis:

`Total HPP = Total Bahan Baku + Total Tenaga Kerja + Total Overhead`

---

## 3. Informasi Produksi

Tambahkan bagian untuk memasukkan:

- Nama produk
- Jumlah produk yang dihasilkan
- Satuan produk
- Persentase margin keuntungan
- Harga jual per unit (opsional)

Rumus HPP per unit:

`HPP per Unit = Total HPP ÷ Jumlah Produk`

Jika pengguna memasukkan margin keuntungan:

`Keuntungan per Unit = HPP per Unit × Margin`

`Harga Jual per Unit = HPP per Unit + Keuntungan per Unit`

Atau:

`Harga Jual = HPP per Unit × (1 + Margin/100)`

Tampilkan hasil dengan jelas.

---

## 4. Fitur Utama

Implementasikan fitur berikut:

### Input Dinamis

Pengguna dapat:
- Menambah item bahan baku
- Menghapus item bahan baku
- Menambah aktivitas tenaga kerja
- Menghapus aktivitas tenaga kerja
- Menambah biaya overhead
- Menghapus biaya overhead

Gunakan React state dengan struktur data yang bersih.

### Perhitungan Real-Time

Setiap perubahan input harus langsung memperbarui:
- Total bahan baku
- Total tenaga kerja
- Total overhead
- Total HPP
- HPP per unit
- Estimasi keuntungan
- Harga jual

Tidak perlu tombol khusus untuk menghitung.

### Reset

Tambahkan tombol:

`Reset Kalkulator`

Ketika diklik, seluruh input dikembalikan ke kondisi awal.

Sebelum reset, tampilkan confirmation dialog jika diperlukan.

### Format Rupiah

Semua nilai uang harus ditampilkan dalam format Rupiah Indonesia.

Contoh:

`Rp 1.500.000`

Gunakan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })`.

Input angka tetap mudah diedit dan tidak mengganggu perhitungan.

---

## 5. Dashboard Hasil

Buat bagian hasil yang mudah dipahami.

Tampilkan beberapa summary card:

### Total Bahan Baku
Contoh:

`Rp 500.000`

### Total Tenaga Kerja
Contoh:

`Rp 250.000`

### Total Overhead
Contoh:

`Rp 150.000`

### Total HPP
Contoh:

`Rp 900.000`

### HPP per Unit
Contoh:

`Rp 9.000`

### Estimasi Harga Jual
Contoh:

`Rp 12.000`

Gunakan visual hierarchy sehingga **Total HPP** dan **HPP per Unit** menjadi informasi yang paling menonjol.

---

## 6. Breakdown Biaya

Tambahkan visualisasi sederhana untuk menunjukkan komposisi biaya.

Contoh:

- Bahan Baku: 55%
- Tenaga Kerja: 28%
- Overhead: 17%

Gunakan CSS/Tailwind atau library chart ringan jika memang diperlukan.

Jika menggunakan chart library, jangan membuat project terlalu kompleks.

Tampilkan juga tabel breakdown:

| Komponen | Total | Persentase |
|---|---:|---:|
| Bahan Baku | Rp ... | ...% |
| Tenaga Kerja | Rp ... | ...% |
| Overhead | Rp ... | ...% |
| Total HPP | Rp ... | 100% |

---

## 7. Validasi Input

Implementasikan validasi yang baik.

Contoh:
- Nama produk tidak boleh kosong.
- Jumlah produk harus lebih dari 0.
- Kuantitas bahan tidak boleh negatif.
- Harga tidak boleh negatif.
- Jumlah orang harus lebih dari 0.
- Jam kerja tidak boleh negatif.
- Margin keuntungan tidak boleh negatif.
- Hindari pembagian dengan nol.

Tampilkan pesan error yang sederhana dan mudah dimengerti.

Contoh:

`Jumlah produk harus lebih dari 0.`

Jangan gunakan error message teknis yang sulit dipahami pengguna.

---

## 8. UI/UX

Buat desain modern dan profesional.

Gunakan gaya:

- Clean
- Minimalis
- Modern
- Profesional
- Responsive
- Mobile-first

Gunakan Tailwind CSS.

### Layout Desktop

Gunakan layout:

```text
--------------------------------------------------
| Navbar                                         |
--------------------------------------------------
| Hero / Header                                  |
| Kalkulator HPP                                |
--------------------------------------------------
| Input Biaya              | Ringkasan HPP       |
|                           |                     |
| Bahan Baku               | Total Bahan        |
| Tenaga Kerja             | Total Tenaga Kerja |
| Overhead                 | Total Overhead     |
|                           | Total HPP          |
|                           | HPP / Unit         |
--------------------------------------------------
| Breakdown Biaya                               |
--------------------------------------------------
| Footer                                         |
--------------------------------------------------
```

### Layout Mobile

Semua section harus tersusun menjadi satu kolom.

Pastikan:
- Tidak ada horizontal overflow.
- Input mudah disentuh.
- Tombol memiliki ukuran yang nyaman.
- Card tidak terlalu padat.

---

## 9. Navbar

Buat navbar sederhana.

Isi:
- Logo / nama aplikasi: **HPP Calculator**
- Menu: Kalkulator
- Menu: Panduan

Pada mobile gunakan menu yang sederhana.

Navbar dapat dibuat sticky jika terlihat bagus.

---

## 10. Hero Section

Buat hero section dengan:

Judul:

**Hitung HPP Produk dengan Mudah**

Subjudul:

**Kelola biaya bahan baku, tenaga kerja, dan overhead untuk mengetahui HPP dan estimasi harga jual produk.**

Tambahkan tombol:

**Mulai Menghitung**

Tombol mengarahkan pengguna ke bagian kalkulator.

---

## 11. Section Kalkulator

Buat form dalam beberapa card.

### Card 1 — Informasi Produk

Field:
- Nama Produk
- Jumlah Produksi
- Satuan

### Card 2 — Bahan Baku

Tabel/list dinamis:

| Nama Bahan | Qty | Satuan | Harga/Satuan | Total | Aksi |
|---|---:|---|---:|---:|---|

Tombol:

`+ Tambah Bahan`

### Card 3 — Tenaga Kerja

| Aktivitas | Orang | Jam | Tarif/Jam | Total | Aksi |
|---|---:|---:|---:|---:|---|

Tombol:

`+ Tambah Tenaga Kerja`

### Card 4 — Overhead

| Biaya | Keterangan | Jumlah | Aksi |
|---|---|---:|---|

Tombol:

`+ Tambah Overhead`

---

## 12. Hasil Perhitungan

Gunakan card khusus untuk hasil.

Prioritaskan:

**Total HPP**

**HPP per Unit**

**Margin Keuntungan**

**Estimasi Harga Jual**

Contoh:

```text
Total HPP
Rp 900.000

Produksi
100 unit

HPP per Unit
Rp 9.000

Margin
30%

Harga Jual per Unit
Rp 11.700
```

---

## 13. Fitur Tambahan yang Disarankan

Jika memungkinkan, tambahkan:

### Simpan Data Lokal

Gunakan `localStorage` agar data kalkulator dapat tetap tersimpan ketika halaman direfresh.

Jangan menggunakan database untuk versi pertama.

### Export

Tambahkan opsi:

`Export Hasil`

Jika mudah diimplementasikan, hasil dapat diekspor menjadi CSV atau PDF.

Jika fitur export membuat project terlalu kompleks, jadikan sebagai fitur opsional.

### Print

Tambahkan tombol:

`Cetak Hasil`

Gunakan CSS print agar hanya hasil kalkulator yang dicetak.

---

## 14. Panduan HPP

Buat section `Panduan HPP`.

Jelaskan secara singkat:

### Apa itu HPP?

HPP adalah total biaya yang dikeluarkan untuk menghasilkan suatu produk yang nantinya digunakan sebagai dasar untuk menentukan harga jual.

### Komponen HPP

1. Bahan Baku
2. Tenaga Kerja
3. Overhead

### Rumus

```text
Total HPP =
Bahan Baku +
Tenaga Kerja +
Overhead
```

```text
HPP per Unit =
Total HPP ÷ Jumlah Produksi
```

```text
Harga Jual =
HPP per Unit × (1 + Margin/100)
```

Buat penjelasan singkat dan mudah dipahami.

---

## 15. Accessibility

Pastikan website memiliki:
- Label pada setiap input.
- Kontras warna yang cukup.
- Focus state pada input dan button.
- Keyboard navigation.
- `aria-label` untuk tombol icon-only.
- Jangan menggunakan warna sebagai satu-satunya indikator error.

---

## 16. Struktur Project

Gunakan struktur yang rapi, misalnya:

```text
app/
├── layout.tsx
├── page.tsx
├── globals.css

components/
├── navbar.tsx
├── hero.tsx
├── product-form.tsx
├── material-cost.tsx
├── labor-cost.tsx
├── overhead-cost.tsx
├── calculation-summary.tsx
├── cost-breakdown.tsx
├── hpp-guide.tsx
└── footer.tsx

lib/
├── calculations.ts
└── formatters.ts

types/
└── hpp.ts
```

Jika struktur project perlu disederhanakan, tetap pisahkan logic perhitungan dari UI sebanyak mungkin.

---

## 17. Arsitektur Logic

Buat fungsi terpisah untuk:

```ts
calculateMaterialCost()
calculateLaborCost()
calculateOverheadCost()
calculateTotalHPP()
calculateHPPPerUnit()
calculateSellingPrice()
calculateProfit()
calculateCostPercentage()
```

Hindari menulis seluruh logic perhitungan langsung di JSX.

Gunakan TypeScript interface/type untuk data:

```ts
interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

interface Labor {
  id: string;
  activity: string;
  workers: number;
  hours: number;
  hourlyRate: number;
}

interface Overhead {
  id: string;
  name: string;
  description: string;
  amount: number;
}
```

---

## 18. State Management

Untuk versi awal gunakan React hooks:

- `useState`
- `useMemo`
- `useEffect`

Gunakan `useMemo` untuk hasil perhitungan yang berasal dari banyak input.

Contoh konsep:

```tsx
const totalMaterial = useMemo(() => {
  return materials.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}, [materials]);
```

Hindari penggunaan state global/library seperti Redux jika belum diperlukan.

---

## 19. Design System

Gunakan design system yang konsisten.

### Typography

Gunakan font modern seperti:
- Inter
- Geist

### Border Radius

Gunakan rounded corners yang moderat.

### Card

Gunakan:
- background putih
- border tipis
- shadow ringan
- padding yang cukup

### Button

Primary button untuk aksi utama.

Secondary button untuk aksi tambahan.

Danger button untuk menghapus item.

### Icons

Jika membutuhkan icon, gunakan library seperti **Lucide React**.

---

## 20. Dark Mode

Jika memungkinkan, tambahkan dark mode menggunakan Tailwind CSS.

Pastikan seluruh:
- Background
- Card
- Text
- Border
- Input
- Button

tetap terbaca dengan baik pada dark mode.

Jika dark mode membuat implementasi terlalu kompleks, prioritaskan light mode yang rapi.

---

## 21. Responsive Breakpoints

Pastikan tampilan bekerja dengan baik pada:

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large desktop: 1280px+

Jangan membuat tabel menjadi terlalu lebar pada mobile.

Pada layar kecil, ubah tabel menjadi card/list jika diperlukan.

---

## 22. Empty State

Jika belum ada bahan baku:

```text
Belum ada bahan baku.
Tambahkan bahan untuk mulai menghitung HPP.
```

Hal yang sama berlaku untuk tenaga kerja dan overhead.

---

## 23. Initial Data

Berikan beberapa contoh data awal agar pengguna langsung memahami cara kerja aplikasi.

Contoh produk:

**Nasi Goreng**

Bahan:
- Beras — 10 kg — Rp15.000/kg
- Telur — 20 butir — Rp2.500/butir
- Minyak — 2 liter — Rp18.000/liter

Tenaga kerja:
- Memasak — 1 orang — 4 jam — Rp20.000/jam

Overhead:
- Gas — Rp30.000
- Kemasan — Rp50.000

Namun berikan tombol reset agar pengguna dapat menghapus data contoh.

---

## 24. SEO

Tambahkan metadata Next.js:

Title:

`Kalkulator HPP - Hitung Harga Pokok Penjualan`

Description:

`Kalkulator HPP online untuk menghitung biaya bahan baku, tenaga kerja, overhead, HPP per unit, dan estimasi harga jual produk.`

Gunakan semantic HTML seperti:
- `header`
- `main`
- `section`
- `footer`
- heading hierarchy yang benar.

---

## 25. Performance

Perhatikan:
- Component yang reusable.
- Jangan melakukan perhitungan berulang yang tidak diperlukan.
- Gunakan `useMemo` untuk kalkulasi.
- Hindari dependency yang tidak diperlukan.
- Jangan memasang library besar jika fitur dapat dibuat dengan React + Tailwind.

---

## 26. Error Handling

Pastikan aplikasi tidak crash jika:
- Input kosong.
- Input bukan angka.
- Jumlah produksi 0.
- Item dihapus.
- Semua item dihapus.
- Nilai sangat besar.
- User memasukkan nilai negatif.

Gunakan fallback yang aman.

---

## 27. Output yang Saya Inginkan

Buat aplikasi secara lengkap, bukan hanya mockup.

Saya ingin mendapatkan:

1. Struktur folder project.
2. Semua file kode yang diperlukan.
3. Komponen React.
4. TypeScript types.
5. Logic perhitungan HPP.
6. Tailwind CSS.
7. Responsive UI.
8. Form validation.
9. Perhitungan real-time.
10. Reset calculator.
11. LocalStorage jika memungkinkan.
12. Cost breakdown.
13. Panduan HPP.
14. SEO metadata.
15. Instruksi instalasi dan menjalankan project.

Gunakan kode yang **clean, modular, mudah dipahami, dan mudah dikembangkan**.

---

## 28. Instruksi untuk AI Coding Agent

Sebelum menulis kode:

1. Periksa struktur project yang sudah ada.
2. Jangan menghapus konfigurasi atau file penting tanpa alasan.
3. Identifikasi apakah Next.js, React, TypeScript, dan Tailwind sudah terpasang.
4. Jika belum, instal dependency yang diperlukan.
5. Gunakan App Router jika project menggunakan Next.js modern.
6. Buat komponen secara modular.
7. Pisahkan calculation logic dari UI.
8. Pastikan TypeScript tidak memiliki error.
9. Jalankan lint/type check/build jika tersedia.
10. Perbaiki error yang ditemukan.
11. Pastikan website dapat dijalankan menggunakan:

```bash
npm run dev
```

dan build production menggunakan:

```bash
npm run build
```

12. Setelah selesai, jelaskan:
   - File yang dibuat/diubah.
   - Fitur yang sudah dibuat.
   - Cara menjalankan project.
   - Dependency yang ditambahkan.
   - Hal yang masih dapat dikembangkan.

---

## 29. Prinsip Utama

Jangan membuat website hanya terlihat bagus tetapi perhitungannya tidak akurat.

Prioritas:

**1. Akurasi perhitungan**

**2. Kemudahan penggunaan**

**3. Responsive design**

**4. Clean code**

**5. UI modern**

**6. Performance**

Pastikan setiap perubahan input langsung menghasilkan perhitungan HPP yang benar.
