# Backend API - User & Session Management

Proyek ini adalah sistem backend API modern yang menangani pendaftaran pengguna (registrasi) dan sistem manajemen sesi (login) menggunakan token UUID. Dibangun dengan fokus pada kecepatan, keamanan, dan struktur kode yang modular.

## 🚀 Tech Stack

Aplikasi ini dibangun menggunakan teknologi terbaru untuk performa maksimal:

- **Runtime**: [Bun](https://bun.sh/) - JavaScript runtime & package manager super cepat.
- **Framework**: [ElysiaJS](https://elysiajs.com/) - Web framework performa tinggi untuk Bun.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM yang ringan dan type-safe.
- **Database**: [MySQL](https://www.mysql.com/) (MySQL 8+) via `mysql2`.
- **Keamanan**: [BcryptJS](https://github.com/dcodeIO/bcrypt.js) untuk hashing password.

---

## 🏗️ Arsitektur & Struktur Folder

Proyek ini menggunakan pola modular yang memisahkan logika perutean (Routing) dari logika bisnis (Services).

### Project Structure
```text
.
├── drizzle/                # File meta & migrasi SQL (auto-generated)
│   ├── meta/               # Snapshot skema database
│   └── 000X_...sql         # File migrasi SQL
├── src/
│   ├── db/                 # Layer Database (Drizzle)
│   │   ├── index.ts        # Koneksi database & pool
│   │   └── schema.ts       # Definisi tabel (Users, Sessions)
│   ├── routes/             # Layer API Routing (Elysia)
│   │   ├── users-route.ts  # Endpoint registrasi
│   │   └── auth-route.ts   # Endpoint login
│   ├── services/           # Layer Logic Bisnis
│   │   ├── users-service.ts # Logic registrasi (hashing pk)
│   │   └── auth-service.ts  # Logic login (verify + token)
│   └── index.ts            # Entry Point aplikasi utama
├── .env                    # Kredensial Database (Local)
├── .env.example            # Template konfigurasi
├── db-init.ts              # Script pembantu inisialisasi DB
├── drizzle.config.ts       # Konfigurasi Drizzle Kit
├── package.json            # Script & dependensi proyek
└── tsconfig.json           # Konfigurasi TypeScript
```

---

## 🗄️ Skema Database

Sistem ini memiliki dua tabel utama di database:

### 1. Tabel `users`
Menyimpan informasi identitas pengguna.
- `id`: BigInt (Primary Key, Auto Increment).
- `name`: Varchar (255) - Nama lengkap.
- `email`: Varchar (255) - Email unik.
- `password`: Varchar (255) - Hash Bcrypt.
- `created_at`: Timestamp - Waktu pendaftaran.

### 2. Tabel `sessions`
Mengelola sesi login aktif.
- `id`: BigInt (Primary Key, Auto Increment).
- `token`: Varchar (255) - UUID Sesi.
- `user_id`: BigInt - Foreign Key ke tabel `users`.
- `created_at`: Timestamp - Waktu login.

---

## 📡 Dokumentasi API

### 1. User Registration
Mendaftarkan akun baru ke sistem.
- **Endpoint**: `POST /api/users`
- **Body Request**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "strongpassword"
  }
  ```
- **Response Tetap**: `{ "success": true, "message": "User created successfully" }`

### 2. User Login
Memproses otentikasi dan memberikan token sesi.
- **Endpoint**: `POST /api/users/login`
- **Body Request**:
  ```json
  {
    "email": "john@example.com",
    "password": "strongpassword"
  }
  ```
- **Response Sukses**: `{ "success": true, "token": "uuid-token-string" }`
- **Response Gagal**: Status 401 dengan pesan *"Email atau password salah"*.

---

## 🛠️ Cara Setup Project

Ikuti perintah di bawah ini untuk menjalankan project di lokal menggunakan Laragon atau MySQL Server lainnya:

### 1. Instalasi
Pastikan Anda sudah menginstal **Bun** di sistem Anda.
```bash
bun install
```

### 2. Konfigurasi Database
Salin `.env.example` menjadi `.env` dan sesuaikan kredensial MySQL Anda.
```bash
cp .env.example .env
```

### 3. Sinkronisasi Database
Generate file migrasi dan terapkan perubahan skema ke database lokal Anda.
```bash
bun run db:generate
bun run db:push
```

### 4. Menjalankan Aplikasi
Jalankan server dalam mode development (dengan fitur watch mode).
```bash
bun run dev
```
Aplikasi akan berjalan di `http://localhost:3000`.

---

## 👨‍💻 Development
- Gunakan `bun run db:generate` setiap kali Anda mengubah isi `src/db/schema.ts`.
- Pastikan password selalu dienskripsi menggunakan bcrypt sebelum disimpan ke database di layer service.
