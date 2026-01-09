# Automated Software Testing menggunakan Cypress  
## Studi Kasus: Website SauceDemo

---

## 1. Deskripsi Proyek

Proyek ini merupakan implementasi **pengujian perangkat lunak otomatis (Automated Testing)** menggunakan framework **Cypress** pada website simulasi e-commerce **SauceDemo**. Pengujian dilakukan untuk memastikan bahwa seluruh fitur utama sistem berjalan sesuai dengan kebutuhan fungsional dan mampu menangani berbagai skenario penggunaan.

Pengujian mencakup proses autentikasi pengguna, pengelolaan produk, manajemen keranjang belanja, proses checkout hingga penyelesaian pesanan. Seluruh skenario pengujian dirancang berdasarkan pendekatan **Black Box Testing** dan dieksekusi secara otomatis menggunakan metode **End-to-End (E2E) Testing**.

Selain pengujian teknis, proyek ini juga menerapkan **pengelolaan proyek pengujian menggunakan Trello** sebagai tools manajemen tugas untuk mengatur pembagian pekerjaan, memantau progres pengujian, serta mendokumentasikan aktivitas pengujian secara terstruktur.

Proyek ini disusun sebagai bagian dari **tugas akademik pada mata kuliah Pengujian Perangkat Lunak** Program Studi Informatika.

---

## 2. Tujuan Pengujian

Tujuan dari proyek pengujian ini adalah:
1. Memverifikasi bahwa seluruh fitur utama aplikasi SauceDemo berfungsi dengan baik
2. Mengidentifikasi potensi kesalahan fungsional pada sistem
3. Menerapkan pengujian otomatis menggunakan Cypress
4. Mendokumentasikan hasil pengujian secara sistematis
5. Menerapkan pengelolaan proyek pengujian berbasis Kanban menggunakan Trello

---

## 3. Ruang Lingkup Pengujian

Pengujian dilakukan terhadap fitur-fitur berikut:

- Autentikasi pengguna (login valid, invalid, dan user terkunci)
- Navigasi halaman dan tampilan inventaris produk
- Pengurutan produk berdasarkan nama dan harga
- Penambahan dan penghapusan item pada keranjang belanja
- Proses checkout (input data, ringkasan pesanan, penyelesaian transaksi)
- Validasi elemen antarmuka pengguna (footer dan tautan media sosial)

Total terdapat **30 Test Case** yang dirancang dan dieksekusi secara otomatis.

---

## 4. Metodologi Pengujian

### 4.1 Jenis Pengujian
Jenis pengujian yang digunakan adalah **Black Box Testing**, yaitu pengujian yang berfokus pada fungsionalitas sistem tanpa memperhatikan struktur kode internal.

### 4.2 Pendekatan Pengujian
Pendekatan yang diterapkan adalah **Automated End-to-End (E2E) Testing**, di mana pengujian dilakukan dari sudut pandang pengguna mulai dari awal hingga akhir alur sistem.

### 4.3 Tools Pengujian
Framework yang digunakan adalah **Cypress**, yang memungkinkan pengujian aplikasi web secara otomatis langsung pada browser dengan hasil yang cepat dan konsisten.

---

## 5. Tools dan Teknologi

- **Framework Testing** : Cypress  
- **Bahasa Pemrograman** : JavaScript  
- **Metode Pengujian** : Automated E2E, Black Box Testing  
- **Manajemen Proyek** : Trello (Kanban Board)  
- **Browser** : Google Chrome  
- **Sistem Operasi** : Windows  
- **Website Uji** : https://www.saucedemo.com  

---

## 6. Struktur Folder Proyek

cypress-main/
├── cypress/
│ ├── e2e/
│ │ └── qa_tests.cy.js # File utama test case Cypress
│ ├── fixtures/ # Data pendukung pengujian
│ ├── screenshots/ # Screenshot hasil pengujian
│ └── videos/ # Rekaman eksekusi test (opsional)
├── docs/
│ └── Hasil_Pengujian_Cypress.docx
├── cypress.config.js # Konfigurasi Cypress
├── package.json # Dependency project
├── package-lock.json
├── .gitignore
└── README.md


---

## 7. Instalasi dan Setup

### 7.1 Prasyarat
Pastikan perangkat telah terinstall:
- Node.js (disarankan versi LTS)
- Git
- Browser Google Chrome

### 7.2 Clone Repository
bash
git clone https://github.com/USERNAME/cypress-saucedemo-testing.git
cd cypress-saucedemo-testing

### 7.3 Install Dependency
npm install

## 8. Menjalankan Pengujian
### 8.1 Mode Headless (Terminal)
npx cypress run

### 8.2 Mode GUI (Interaktif)
npx cypress open



