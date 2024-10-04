const readline = require('readline-sync');

let ulangi = true;
let hasilSebelumnya = null;
let riwayatKalkulasi = [];

// Menu utama
while (ulangi) {
    console.log('\n===== Menu Utama =====');
    console.log('1. Kalkulasi');
    console.log('2. Lihat Riwayat');
    console.log('3. Keluar');
    
    const pilihanMenuUtama = readline.question('Pilih opsi (1/2/3): ');

    switch (pilihanMenuUtama) {
        case '1':
            menuKalkulasi();
            break;
        case '2':
            tampilkanRiwayat();
            break;
        case '3':
            const konfirmasiKeluar = readline.question('Apakah Anda yakin ingin keluar? (ya/tidak): ');
            if (konfirmasiKeluar.toLowerCase() === 'ya') {
                ulangi = false;
            }
            break;
        default:
            console.log('Pilihan tidak valid. Silakan coba lagi.');
    }
}

// Sub menu untuk kalkulasi
function menuKalkulasi() {
    let lanjutKalkulasi = true;

    while (lanjutKalkulasi) {
        console.log('\n===== Sub Menu Kalkulasi =====');
        console.log('1. Pertambahan');
        console.log('2. Pengurangan');
        console.log('3. Perkalian');
        console.log('4. Pembagian');
        console.log('5. Modulus');
        console.log('6. Akar');
        console.log('7. Sinus');
        console.log('8. Cosinus');
        console.log('9. Tangen');

        const pilihanKalkulasi = readline.question('Pilih jenis kalkulasi (1-9): ');

        if (['6', '7', '8', '9'].includes(pilihanKalkulasi)) {
            let angka = parseFloat(readline.question('Masukan angka: '));

            if (isNaN(angka)) {
                console.log('Inputan anda tidak valid!');
            } else {
                let hasil = processHasilSpecial(angka, pilihanKalkulasi);
                console.log(`Hasilnya: ${hasil}`);
                riwayatKalkulasi.push(`${getOperatorName(pilihanKalkulasi)} ${angka} = ${hasil}`);
                hasilSebelumnya = hasil;
            }
        } else {
            let angkaPertama;
        
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
            const operator = getOperator(pilihanKalkulasi);

            if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
                console.log('Inputan anda tidak valid!');
            } else {
                let hasil = processHasil(angkaPertama, angkaKedua, operator);
                console.log(`Hasil dari ${angkaPertama} ${operator} ${angkaKedua} adalah ${hasil}`);
                riwayatKalkulasi.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
                hasilSebelumnya = hasil;
            }
        }

        // Tanyakan apakah ingin melanjutkan kalkulasi atau kembali ke menu utama
        const jawabanLanjut = readline.question('Apakah ingin melanjutkan kalkulasi? (ya/tidak): ');
        if (jawabanLanjut.toLowerCase() !== 'ya') {
            lanjutKalkulasi = false;  // Kembali ke menu utama jika jawabannya tidak
        }
    }
}

// Fungsi untuk kalkulasi normal
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
                return 0;
            }
            return inputanPertama / inputanKedua;
        case '%':
            return inputanPertama % inputanKedua;
        default:
            return 'Operator tidak valid';
    }
}

// Fungsi untuk kalkulasi special (akar, sin, cos, tan)
function processHasilSpecial(angka, pilihan) {
    switch (pilihan) {
        case '6':
            return Math.sqrt(angka);
        case '7':
            return Math.sin(angka);
        case '8':
            return Math.cos(angka);
        case '9':
            return Math.tan(angka);
        default:
            return 'Pilihan tidak valid';
    }
}

// Fungsi untuk mendapatkan operator kalkulasi biasa
function getOperator(pilihan) {
    switch (pilihan) {
        case '1':
            return '+';
        case '2':
            return '-';
        case '3':
            return '*';
        case '4':
            return '/';
        case '5':
            return '%';
        default:
            return null;
    }
}

// Fungsi untuk mendapatkan nama operasi
function getOperatorName(pilihan) {
    switch (pilihan) {
        case '6':
            return 'Akar';
        case '7':
            return 'Sinus';
        case '8':
            return 'Cosinus';
        case '9':
            return 'Tangen';
        default:
            return '';
    }
}

// Fungsi untuk menampilkan riwayat
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
