// Constants and Variables
const MINIMUM_AGE = 15;
const MAXIMUM_AGE = 50;
const MINIMUM_SEMESTER = 1;
const MAXIMUM_SEMESTER = 14;
const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Data Types and Structures
const dataTypes = {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    OBJECT: 'object'
};

// ===== JS FUNCTIONS =====
// Utility Functions
function validateEmail(email) {
    return VALID_EMAIL_REGEX.test(email);
}

function validateAge(age) {
    return age >= MINIMUM_AGE && age <= MAXIMUM_AGE;
}

function validateNIM(nim) {
    return /^\d{1,12}$/.test(nim);
}

function getSelectedValue(selectElement) {
    return selectElement.options[selectElement.selectedIndex].value === 'true';
}

function formatOutput(data) {
    return `
=== Data yang Diinput ===

String:
- Nama: ${data.nama}
- Email: ${data.email}

Number:
- Umur: ${data.umur} tahun
- Tinggi: ${data.tinggi} cm

Boolean:
- Status Pekerjaan: ${data.punyaPekerjaan ? 'Sudah Bekerja' : 'Belum Bekerja'}

Array (Hobi):
- ${data.hobi.join('\n- ')}

Object (Mahasiswa):
- NIM: ${data.mahasiswa.nim}
- Jurusan: ${data.mahasiswa.jurusan}
- Semester: ${data.mahasiswa.semester}
- Status: ${data.mahasiswa.aktif ? 'Aktif' : 'Tidak Aktif'}

=== Tipe Data ===
- Nama: ${typeof data.nama}
- Email: ${typeof data.email}
- Umur: ${typeof data.umur}
- Tinggi: ${typeof data.tinggi}
- Status Pekerjaan: ${typeof data.punyaPekerjaan}
- Hobi: ${typeof data.hobi}
- Data Mahasiswa: ${typeof data.mahasiswa}

=== Hasil Perhitungan ===
- Luas Persegi Panjang: ${data.luasPersegiPanjang} cm²
- Hasil Operasi Aritmatika (a + b): ${data.hasilPerhitungan}
- Grade Nilai: ${data.grade}
- Nama Hari: ${data.namaHari}
    `;
}

// ===== JS CONTROL FLOW =====
// Grade Calculator
function calculateGrade(nilai) {
    if (nilai >= 90) return 'A';
    if (nilai >= 80) return 'AB';
    if (nilai >= 79) return 'BA';
    if (nilai >= 69) return 'B';
    if (nilai >= 63) return 'BC';
    if (nilai >= 62) return 'C';
    if (nilai >= 56) return 'CD';
    if (nilai >= 50) return 'D';
    return 'E';
}

// Day Name Converter
function getDayName(dayNumber) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[dayNumber - 1] || 'Hari tidak valid';
}

// Calculate Rectangle Area
function calculateRectangleArea(length, width) {
    return length * width;
}

// ===== JS EXCEPTION (CASE) =====
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateInput(data) {
    // Validate String inputs
    if (!data.nama) throw new ValidationError('Nama tidak boleh kosong');
    if (!validateEmail(data.email)) throw new ValidationError('Format email tidak valid');

    // Validate Number inputs
    if (!validateAge(data.umur)) throw new ValidationError(`Umur harus antara ${MINIMUM_AGE} dan ${MAXIMUM_AGE} tahun`);
    if (data.tinggi <= 0) throw new ValidationError('Tinggi badan tidak valid');

    // Validate Student Data
    if (!validateNIM(data.mahasiswa.nim)) throw new ValidationError('NIM harus berupa angka dengan maksimal 12 digit');
    if (data.mahasiswa.semester < MINIMUM_SEMESTER || data.mahasiswa.semester > MAXIMUM_SEMESTER) {
        throw new ValidationError(`Semester harus antara ${MINIMUM_SEMESTER} dan ${MAXIMUM_SEMESTER}`);
    }

    // Validate Hobbies
    if (data.hobi.some(hobby => !hobby.trim())) {
        throw new ValidationError('Semua hobi harus diisi');
    }

    return true;
}

// Main Form Handler
function handleSubmit(event) {
    event.preventDefault();
    const outputDiv = document.getElementById('output');
    const outputText = document.getElementById('outputText');

    try {
        // Collect form data
        const formData = {
            nama: document.getElementById('nama').value,
            email: document.getElementById('email').value,
            umur: Number(document.getElementById('umur').value),
            tinggi: Number(document.getElementById('tinggi').value),
            punyaPekerjaan: getSelectedValue(document.getElementById('statusKerja')),
            hobi: [
                document.getElementById('hobi1').value,
                document.getElementById('hobi2').value,
                document.getElementById('hobi3').value
            ],
            mahasiswa: {
                nim: document.getElementById('nim').value,
                jurusan: document.getElementById('jurusan').value,
                semester: Number(document.getElementById('semester').value),
                aktif: getSelectedValue(document.getElementById('statusAktif'))
            }
        };

        // Validate inputs
        validateInput(formData);

        // Additional calculations
        const nilaiA = Number(document.getElementById('nilaiA').value);
        const nilaiB = Number(document.getElementById('nilaiB').value);
        const nilaiUjian = Number(document.getElementById('nilaiUjian').value);
        const hari = Number(document.getElementById('hari').value);
        const panjang = Number(document.getElementById('panjang').value);
        const lebar = Number(document.getElementById('lebar').value);

        // Add calculated results to formData
        formData.luasPersegiPanjang = calculateRectangleArea(panjang, lebar);
        formData.hasilPerhitungan = nilaiA + nilaiB;
        formData.grade = calculateGrade(nilaiUjian);
        formData.namaHari = getDayName(hari);

        // Display results
        outputDiv.style.display = 'block';
        outputText.textContent = formatOutput(formData);

        // Log data types
        console.log("=== Data Type Check ===");
        Object.entries(formData).forEach(([key, value]) => {
            console.log(`${key}:`, value, `(${typeof value})`);
        });

    } catch (error) {
        let errorMessage = 'Terjadi kesalahan: ';
        if (error instanceof ValidationError) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Terjadi kesalahan sistem. Silakan coba lagi.';
            console.error(error);
        }
        alert(errorMessage);
        outputDiv.style.display = 'none';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log("File JavaScript berhasil dimuat!");
    document.getElementById('dataForm').addEventListener('submit', handleSubmit);
});