# Dashboard Application

Aplikasi dashboard modern yang dibangun dengan React, TypeScript, dan Vite. Aplikasi ini menggunakan komponen UI yang powerful dengan Tailwind CSS dan Radix UI.

## 🚀 Tech Stack

- **React 19** - Library UI modern
- **TypeScript** - Type safety
- **Vite** - Build tool yang cepat
- **React Router v7** - Routing
- **Tailwind CSS v4** - Styling utility-first
- **Radix UI** - Komponen UI primitif yang accessible
- **shadcn/ui** - Komponen UI yang dapat dikustomisasi
- **Lytenyte Core** - Komponen UI tambahan
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Chart library
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (versi 18 atau lebih tinggi)
- **Yarn** (package manager)

## 🛠️ Installation

1. Clone repository ini:

```bash
git clone <repository-url>
cd app-new
```

2. Install dependencies menggunakan yarn:

```bash
yarn install
```

## 🎯 Available Scripts

### Development

Menjalankan aplikasi dalam mode development:

```bash
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port yang tersedia).

### Build

Membangun aplikasi untuk production:

```bash
yarn build
```

Output build akan berada di folder `dist/`.

### Preview

Preview build production secara lokal:

```bash
yarn preview
```

### Linting

Menjalankan ESLint untuk mengecek kode:

```bash
yarn lint
```

## 📁 Project Structure

```
app-new/
├── public/              # Static assets
├── src/
│   ├── assets/         # CSS dan assets
│   ├── components/     # Komponen React
│   │   ├── ui/        # Komponen UI (shadcn/ui)
│   │   └── ...        # Komponen lainnya
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── main.tsx       # Entry point aplikasi
│   └── router.tsx     # Konfigurasi routing
├── docs/              # Dokumentasi
├── scripts/           # Script utilities
├── components.json    # Konfigurasi shadcn/ui
├── vite.config.ts     # Konfigurasi Vite
├── tsconfig.json      # Konfigurasi TypeScript
└── package.json       # Dependencies dan scripts
```

## 🎨 Menambahkan Komponen UI

Aplikasi ini menggunakan shadcn/ui. Untuk menambahkan komponen baru:

```bash
npx shadcn@latest add <component-name>
```

Contoh:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## 🔧 Konfigurasi

### Path Aliases

Proyek ini menggunakan path alias untuk import yang lebih mudah:

- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`
- `@/assets` → `src/assets`

### Theme

Aplikasi mendukung dark mode dan light mode. Theme dapat diubah melalui `ModeToggle` component.

## 📝 Development Guidelines

- Gunakan TypeScript untuk semua file
- Ikuti konvensi naming yang konsisten
- Gunakan komponen UI yang sudah tersedia di `src/components/ui`
- Pastikan kode sudah di-lint sebelum commit

## 🤝 Contributing

1. Buat branch baru untuk fitur atau bugfix
2. Commit perubahan Anda
3. Push ke branch
4. Buat Pull Request

## 📄 License

[Tambahkan informasi license jika ada]

---

Dibuat dengan ❤️ menggunakan React dan Vite
