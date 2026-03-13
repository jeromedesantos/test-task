# Test Task

Deskripsi singkat project ini adalah sebuah aplikasi todo list sederhana yang dibangun dengan React di frontend dan Node.js (Express) di backend.

## Tech Stack

**Frontend:**

- React
- Vite
- TypeScript
- Bun
- React Router
- Zustand (untuk state management)
- React Hook Form & Zod (untuk validasi form)

**Backend:**

- Node.js
- Express
- TypeScript
- Bun
- Prisma (ORM)
- PostgreSQL
- JWT (untuk autentikasi via cookies)
- Bcrypt (untuk hashing password)

## Cara Install & Run

### Backend

1.  **Masuk ke direktori backend:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Setup database (lihat di bawah)**

4.  **Jalankan aplikasi:**

    ```bash
    bun run dev
    ```

### Frontend

1.  **Masuk ke direktori frontend:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Buat file `.env` dan isi dengan URL backend:**

    ```
    VITE_API_URL=http://localhost:3000
    ```

4.  **Jalankan aplikasi:**

    ```bash
    bun run dev
    ```

## Cara Setup Database

1.  **Pastikan PostgreSQL sudah terinstall dan berjalan.**
2.  **Buat database baru di PostgreSQL.**
3.  **Di direktori `backend`, copy file `prisma/schema.prisma` dan sesuaikan koneksi database di bagian `datasource db` jika perlu.**
    _Note: Sebaiknya gunakan environment variable untuk koneksi database di production, namun untuk development, setup ini sudah cukup._

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    }
    ```

4.  **Jalankan migrasi Prisma untuk membuat tabel:**

    ```bash
    cd backend
    bunx prisma migrate dev
    ```

## API Endpoints Documentation

Autentikasi untuk endpoint yang memerlukan (ditandai dengan `auth`) ditangani secara otomatis menggunakan http-only cookie yang dikirimkan oleh server setelah login berhasil.

### Users

- **POST /users** - Registrasi user baru
- **GET /users** - `auth` - Mendapatkan semua user
- **GET /users/me** - `auth` - Mendapatkan informasi user yang sedang login
- **GET /users/:id** - `auth` - Mendapatkan user berdasarkan ID
- **PUT /users/me** - `auth` - Update informasi user yang sedang login
- **PUT /users/:id** - `auth` - Update user berdasarkan ID
- **DELETE /users** - `auth` - Menghapus user yang sedang login
- **POST /users/login** - Login user, server akan mengirimkan cookie autentikasi
- **POST /users/logout** - `auth` - Logout user, menghapus cookie autentikasi
- **GET /users/:id/tasks** - `auth` - Mendapatkan semua task milik user tertentu

### Tasks

- **POST /tasks** - `auth` - Membuat task baru
- **GET /tasks** - Mendapatkan semua task
- **GET /tasks/my-tasks** - `auth` - Mendapatkan semua task milik user yang sedang login
- **GET /tasks/:id** - `auth` - Mendapatkan task berdasarkan ID
- **PUT /tasks/:id** - `auth` - Update task berdasarkan ID
- **DELETE /tasks/:id** - `auth` - Menghapus task berdasarkan ID

## Contoh Request/Response

### Registrasi User

**Request:**

```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (201 Created):**

```json
{
  "id": "c7a9a7a8-8f8e-4b4f-8b5a-2e4d3f3e3e3e",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2026-03-13T10:00:00.000Z",
  "updatedAt": "2026-03-13T10:00:00.000Z"
}
```

### Login User

**Request:**

```http
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

(Server akan mengirimkan `Set-Cookie` header untuk memulai sesi)

### Membuat Task

**Request:**

```http
POST /tasks
Content-Type: application/json

{
  "title": "My first task",
  "description": "This is my first task"
}
```

**Response (201 Created):**

```json
{
  "id": "d8b9b8b7-9f9e-5c5c-9c6b-3f5e4f4e4e4e",
  "title": "My first task",
  "description": "This is my first task",
  "status": "PENDING",
  "userId": "c7a9a7a8-8f8e-4b4f-8b5a-2e4d3f3e3e3e",
  "createdAt": "2026-03-13T10:05:00.000Z",
  "updatedAt": "2026-03-13T10:05:00.000Z"
}
```
