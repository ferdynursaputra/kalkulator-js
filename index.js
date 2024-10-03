const readline = require('readline-sync');

let ulangi = true;
let hasilSebelumnya = null;
let riwayatKalkulasi = [];

while (ulangi) {
    let angkaPertama;
    
    // Jika ada hasil sebelumnya, beri opsi untuk menggunakannya
    if (hasilSebelumnya !== null) {
        const gunakanHasilSebelumnya = readline.question('Apakah ingin menggunakan hasil sebelumnya sebagai angka pertama? (ya/tidak): ');
        if (gunakanHasilSebelumnya.toLowerCase() === 'ya') {
            angkaPertama = hasilSebelumnya;
            console.log(`Angka pertama adalah hasil sebelumnya: ${angkaPertama}`);
        } else {
            angkaPertama = parseFloat(readline.question('Masukan Angka Pertama: '));
        }
    } else {
        angkaPertama = parseFloat(readline.question('Masukan Angka Pertama: '));
    }
    
    let angkaKedua = parseFloat(readline.question('Masukan Angka Kedua: '));
    const operator = readline.question('Pilih Operator (+, -, *, /, %) : ');     

    const requiredOperator = ['+', '-', '*', '/', '%'];

    if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
        console.log('Inputan anda tidak valid!');
    } else if (!requiredOperator.includes(operator)) {
        console.log('Pilih Sesuai Operator yang tersedia!');
    } else {
        let hasil = processHasil(angkaPertama, angkaKedua, operator);

        // Jika hasilnya 0, otomatis minta angka kedua baru dan kalkulasi ulang
        while (hasil === 0) {
            console.log('Hasilnya 0, masukan angka kedua yang baru.');
            angkaKedua = parseFloat(readline.question('Masukan Angka Kedua yang baru: '));
            hasil = processHasil(angkaPertama, angkaKedua, operator);
        }

        console.log(`Hasil dari ${angkaPertama} ${operator} ${angkaKedua} adalah ${hasil}`);

        // Simpan hasil untuk digunakan kembali dan simpan ke riwayat
        hasilSebelumnya = hasil;
        riwayatKalkulasi.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
    }

    const lihatRiwayat = readline.question('Apakah anda ingin melihat riwayat kalkulasi? (ya/tidak): ');
    if (lihatRiwayat.toLowerCase() === 'ya') {
        tampilkanRiwayat();
    }

    const jawabanUlang = readline.question('Apakah anda ingin menghitung lagi? (ya/tidak): ');
    if (jawabanUlang.toLowerCase() !== 'ya') {
        ulangi = false;
    }
}

function processHasil(inputanPertama, inputanKedua, operator) {
    switch (operator) {
        case '+':
            return inputanPertama + inputanKedua;
        case '-':
            return inputanPertama - inputanKedua;
        case '*':
            return inputanPertama * inputanKedua;
        case '/':
            if (inputanKedua === 0) {
                console.log('Pembagian dengan nol tidak diperbolehkan!');
                return 0; // Kembalikan hasil 0 agar bisa dicek
            }
            return inputanPertama / inputanKedua;
        case '%':
            return inputanPertama % inputanKedua;
        default:
            return 'Operator tidak valid';
    }
}

function tampilkanRiwayat() {
    console.log('\nRiwayat Kalkulasi:');
    if (riwayatKalkulasi.length === 0) {
        console.log('Belum ada kalkulasi yang dilakukan.');
    } else {
        riwayatKalkulasi.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry}`);
        });
    }
    console.log(); // untuk memberikan jarak di terminal
}
