const express = require('express');
const path = require('path');
const app = express();

// Membantu mesin membaca data tulisan dan angka yang dikirim HP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kantong ajaib sementara untuk menyimpan data donasi di dalam memori HP
let kantongDonasiAdmin = [
    { nama: "Budi Santoso", jumlah: 100000, status: "Berhasil" },
    { nama: "Hamba Allah", jumlah: 50000, status: "Berhasil" }
];

// 1. ATUR RUTE HALAMAN UTAMA (DONATUR)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. ATUR RUTE HALAMAN ADMIN
app.get('/admin-panel', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// 3. JALUR PENGIRIMAN DATA (Saat donatur klik tombol, data masuk ke sini)
app.post('/api/kirim-donasi', (req, res) => {
    const { nama, jumlah } = req.body;
    
    // Masukkan data baru dari donatur ke dalam kantong ajaib admin
    kantongDonasiAdmin.push({
        nama: nama || "Anonim",
        jumlah: parseInt(jumlah),
        status: "Berhasil (Simulasi)"
    });

    res.json({ pesan: "Data donasi berhasil dicatat oleh mesin!" });
});

// 4. JALUR PENGAMBILAN DATA (Halaman admin mengambil data dari kantong ajaib ini)
app.get('/api/ambil-donasi', (req, res) => {
    res.json(kantongDonasiAdmin);
});

// MENYALAKAN MESIN DI PORT 3000
app.listen(3000, () => {
    console.log('=== MESIN WEB AKTIF! ===');
    console.log('Buka browser HP dan ketik: http://localhost:3000');
});