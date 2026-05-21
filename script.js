// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-pills');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon between bars and times
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Close mobile menu when clicking a link
const links = document.querySelectorAll('.nav-pills li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Active Menu Highlight on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, header');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Adjust the offset to trigger slightly before reaching the exact top
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (current && href && href.includes(current) && href !== '#') {
            link.classList.add('active');
        }
    });
});

// Add subtle animation on scroll for elements
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.feature-card, .attach-card, .profile-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 50) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .attach-card, .profile-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
    });
    
    // Trigger once on load
    setTimeout(animateOnScroll, 100);
});


window.addEventListener('scroll', animateOnScroll);

// Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn, .tab-btn-min');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            const targetElement = document.getElementById(targetTab);
            
            if (targetElement) {
                // Scope the switching logic to the closest section or parent container
                const section = btn.closest('.section') || document;
                const scopedBtns = section.querySelectorAll('.tab-btn, .tab-btn-min');
                const scopedContents = section.querySelectorAll('.tab-content');
                
                // Remove active class from buttons and contents within the same section
                scopedBtns.forEach(b => b.classList.remove('active'));
                scopedContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and target content
                btn.classList.add('active');
                targetElement.classList.add('active');
            }
        });
    });
});

// Typewriter Animation for Quotes
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    
    const startTyping = () => {
        element.innerHTML = '';
        element.style.opacity = '1';
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Wait 3 seconds then restart the flow
                setTimeout(() => {
                    i = 0;
                    startTyping();
                }, 3000);
            }
        }, speed);
    };
    
    startTyping();
};

document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('typing-quote');
    if (quoteElement) {
        const text = quoteElement.innerText;
        quoteElement.innerHTML = ''; // Clear initially
        quoteElement.style.opacity = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Delay slightly for better feel
                    setTimeout(() => {
                        typeWriter(quoteElement, text);
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(quoteElement);
    }
});

// Global File Filtering Logic (Sticky State)
let currentGlobalFilter = 'semua';

const applyGlobalFilter = () => {
    // Find all file items in the entire document
    const allFileItems = document.querySelectorAll('.file-item');
    
    allFileItems.forEach(item => {
        if (currentGlobalFilter === 'semua' || item.getAttribute('data-category') === currentGlobalFilter) {
            item.style.display = 'flex'; // Use flex to maintain styling
            
            // Add a small animation for smooth transition
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        } else {
            item.style.display = 'none';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const globalFilterBtns = document.querySelectorAll('.global-filter-wrapper .filter-btn');
    
    globalFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filter buttons
            globalFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update global filter state
            currentGlobalFilter = btn.getAttribute('data-filter');
            
            // Apply the filter across all tabs
            applyGlobalFilter();
        });
    });
    
    // Make sure Tab Switching Logic also triggers filter application
    // to maintain the "Sticky" state when revealing a new tab content
    const tabBtns = document.querySelectorAll('.tab-btn-min[data-tab^="siklus"]');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Apply filter after a short delay to allow tab to become active
            setTimeout(applyGlobalFilter, 50);
        });
    });
});

// Document Analysis Modal Logic
const analysisData = {
    rpp_s2: {
        title: "ANALISIS RPP SIKLUS 2",
        konteks: `<p class="analysis-text-para">RPP mata pelajaran Teknik Pemesinan Non Konvensional kelas XI SMK Muhammadiyah 3 Yogyakarta. Dokumen untuk Siklus 2 ini membahas topik persiapan/perawatan mesin, K3, dan penulisan siklus bubut rata G71 menggunakan simulator Swansoft SSCNC (<em>FANUC 0i T</em>) selama 3 pertemuan (<strong>24 JP</strong>).</p>`,
        tujuan: `<p class="analysis-text-para">Memandu guru melaksanakan pembelajaran mendalam (<em>deep learning</em>) agar siswa mampu menerapkan prosedur persiapan, tindakan <em>maintenance</em> berkala, prinsip keselamatan kerja (K3) bengkel, serta mampu menyusun koordinat proyek terstruktur menggunakan kode siklus G71 secara presisi pada simulator.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Sistem Among (Ki Hadjar Dewantara):</strong> Berperan menuntun kodrat praktikan melalui penanaman teladan budaya industri (<em>Ing Ngarsa Sung Tuladha</em>), fasilitasi investigasi kelompok (<em>Ing Madya Mangun Karsa</em>), dan pemicuan evaluasi-refleksi mandiri (<em>Tut Wuri Handayani</em>).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Deep Learning Framework:</strong> Internalisasi pemahaman bermakna melalui visualisasi kasus kecelakaan/kerusakan mesin (<em>Mindful</em> & <em>Meaningful</em>) serta pengujian penguasaan kognitif instan lewat platform gamifikasi (<em>Joyful</em>).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Model Belajar Kombinatif (PBL & PjBL):</strong> Konstruksi pemikiran kritis melalui penyelesaian masalah (<em>Problem Based Learning</em>) pada teori K3/perawatan, yang diintegrasikan dengan <em>Project Based Learning</em> untuk mengeksekusi produk berbasis kode siklus.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Scaffolding & Diferensiasi:</strong> Strategi penyeimbangan kesenjangan pemahaman dasar mekanis murid melalui pembimbingan personal terarah serta pemberdayaan siswa mahir sebagai tutor sebaya (<em>peer teaching</em>).</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Pembaruan Kriteria Ketercapaian (KKTP) pada tabel desain belajar sudah sangat spesifik mencakup prosedur persiapan (5.6.2), <em>maintenance</em> (5.6.3), dan aspek keselamatan kerja K3 (5.6.4).</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Orientasi masalah pada sintaks awal PBL dikonstruksikan secara kuat dengan menyajikan tautan stimulus gambar kasus otentik terkait kecelakaan kerja dan kerusakan komponen mekanis.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Pemilihan materi penulisan program siklus G71 pada Pertemuan 6 sangat relevan untuk melatih efisiensi penulisan blok kode program (<em>canned cycle</em>) sesuai standar operasional industri manufaktur.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Rencana Remedial yang Terlalu Pasif untuk Pembelajaran Vokasi:</strong> Langkah remedial yang dirancang hanya berupa "melihat tayangan video" atau "membaca ulang materi". Untuk mata pelajaran Teknik Pemesinan yang berbasis kompetensi praktis operasional, tindakan remedial konseptual seperti ini kurang efektif dan seharusnya melibatkan pemrograman ulang terbimbing (<em>re-programming</em>) pada simulator.</li>
            </ul>`
    },
    bahan_ajar_s2_p4: {
        title: "ANALISIS BAHAN AJAR PERTEMUAN 4",
        konteks: `<p class="analysis-text-para">Bahan ajar berupa modul panduan operasional harian (<em>Preventive Maintenance & SOP Startup</em>) sebanyak 14 halaman. Perangkat ini disusun untuk mata pelajaran Teknik Pemesinan CNC kelas XI SMK Konsentrasi Keahlian Teknik Pemesinan pada Pertemuan 4.</p>`,
        tujuan: `<p class="analysis-text-para">Memberikan panduan prosedural yang komprehensif bagi siswa mengenai tahapan persiapan awal keselamatan kerja (K3), langkah menghidupkan mesin (<em>startup</em>), pemanasan spindel (<em>warm-up</em>), pengembalian sumbu referensi (<em>homing</em>), hingga pelaksanaan perawatan pencegahan (<em>preventive maintenance</em>) pada mesin CNC Turning.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Sequential Flow Operations (Algoritma Prosedural):</strong> Menggunakan diagram alir petunjuk langkah demi langkah (<em>flowchart logic</em>) dari kondisi mesin mati (OFF) hingga pengujian tanpa pemotongan (<em>dry run</em>). Hal ini bertujuan untuk mengondisikan memori kerja siswa agar terbiasa mengeksekusi tindakan bengkel secara runtut tanpa melewatkan item kritis.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Preventive Maintenance Theory:</strong> Penanaman konsep bahwa merawat mesin secara berkala (inspeksi visual, cek level pelumas/coolant) merupakan investasi efisiensi industri untuk mencegah waktu henti produksi (<em>downtime</em>) dan kerusakan fatal pada komponen mekanis presisi.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Alur Sekuensial yang Sangat Jelas:</strong> Bagan "Alur Prosedur Persiapan Awal Mesin CNC Turning" dari poin 1 sampai 10 (K3 ➔ Inspeksi ➔ Cek Oli ➔ Startup ➔ Warm-Up ➔ Homing ➔ Offset ➔ Pencekaman ➔ Zero Program ➔ Dry Run) dipaparkan dengan sangat logis dan terstruktur.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Kesesuaian Target Kelas Administrasi:</strong> Berbeda dengan modul bagian mesin sebelumnya, dokumen ini sudah konsisten tertulis untuk <strong>Kelas XI SMK</strong>, sehingga sinkron secara linier dengan target sasaran pada RPP Siklus 2 dan Siklus 3 Anda.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Dilengkapi Rubrik Penilaian Unjuk Kerja:</strong> Modul ini memiliki nilai tambah karena menyertakan rubrik penilaian kinerja harian (mencakup bobot penilaian prosedur *startup*, *setup offset*, kegiatan PM, hingga dokumentasi log harian).</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Penggunaan Istilah Bahasa Inggris Tanpa Glosarium Penjelas:</strong> Banyak ditemukan istilah teknis manufaktur kelas atas pada bagan alur seperti <em>Main power</em>, <em>Controller</em>, <em>Hydraulic</em>, <em>Warm-Up Spindle</em>, <em>Home Reference (G28)</em>, <em>Tool offset</em>, <em>Program Zero (G54)</em>, hingga <em>DRY RUN</em>. Istilah-istilah ini berisiko membingungkan siswa kelas XI jika di dalam halaman tidak disertakan glosarium/kamus istilah terjemahan operasionalnya.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Risiko Kompleksitas Perbedaan Kontrol Panel:</strong> Prosedur <em>startup</em> dan <em>homing</em> (G28) dijabarkan secara umum. Namun pada kenyataannya, setiap tipe mesin kontrol (Fanuc, Siemens, GSK, atau Emco) memiliki tata letak tombol fisik dan urutan sakelar yang berbeda-beda. Modul ini belum memberikan catatan penyesuaian khusus untuk tipe pengontrol (<em>controller</em>) tertentu yang ada di bengkel sekolah Anda.</li>
            </ul>`
    },
    bahan_ajar_s2_p5: {
        title: "ANALISIS BAHAN AJAR PERTEMUAN 5",
        konteks: `<p class="analysis-text-para">Dokumen bahan ajar (modul/handout) berbasis teks untuk mata pelajaran Permesinan Non Konvensional (Teknik Mesin) Kelas XI SMK. Dokumen ini disusun oleh Muhammad Harist Mishbahuddin sebagai lampiran pendukung Rencana Pelaksanaan Pembelajaran (RPP) untuk topik pengoperasian dasar CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Memberikan landasan teoretis yang kuat dan komprehensif kepada peserta didik mengenai tiga aspek fundamental sebelum praktik, yaitu: pengenalan bagian-bagian utama mesin, langkah prosedur persiapan/perawatan (SOP <em>startup & shutdown</em>), serta penerapan Keselamatan dan Kesehatan Kerja (K3) di area bengkel.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Self-Regulated Learning:</strong> Penyediaan <em>handout</em> tekstual semacam ini berfungsi sebagai <em>advance organizer</em>, memungkinkan siswa membaca dan mengatur ekspektasi belajarnya sendiri sebelum menghadapi kompleksitas mesin sesungguhnya di lapangan.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Vocational Safety Culture:</strong> Penggabungan materi komponen mesin dengan instruksi K3 dan jadwal perawatan berkala (PM) dalam satu modul menegaskan paradigma bahwa keselamatan dan perawatan adalah bagian integral dari kompetensi operasional operator mesin CNC di industri.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Struktur yang Sangat Lengkap dan Runtut:</strong> Modul ini bertindak sebagai paket komplit (<em>all-in-one guide</em>). Susunannya sangat sistematis mulai dari identifikasi komponen (Spindel, Chuck, Turret), SOP prosedur <em>startup/shutdown</em>, rincian perawatan (Harian, Mingguan, Bulanan), hingga instruksi K3.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Kehadiran Glosarium Manufaktur:</strong> Kelemahan pada modul-modul sebelumnya (di mana banyak istilah teknis bahasa Inggris yang luput dijelaskan) berhasil diatasi di sini. Penyediaan glosarium di bagian akhir untuk istilah seperti <em>Dry run, Interlock, Spindle</em>, dan <em>Coolant</em> akan sangat membantu literasi teknis siswa SMK.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Daftar Rujukan Industri Standar Global:</strong> Penggunaan literatur rujukan dari pabrikan dan institusi ternama (seperti Haas Automation, CMZ, dan Cornell EHS) menjamin validitas SOP di dalam modul ini sudah setara dengan standar operasional riil di industri manufaktur.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Prosedur yang Masih Terlalu Abstrak/General:</strong> Karena modul ini didesain agar bisa disesuaikan dengan berbagai pengontrol mesin (<em>FANUC, Siemens, Haas</em>), instruksi proseduralnya menjadi kurang spesifik. Bagi siswa kelas XI yang baru pertama kali menyentuh mesin, mereka membutuhkan instruksi yang pasti dan presisi (misal: tombol mana persisnya yang harus tekan di mesin yang ada di lab sekolah), bukan sekadar langkah konseptual secara umum.</li>
            </ul>`
    },
    bahan_ajar_s2_p6: {
        title: "ANALISIS BAHAN AJAR PERTEMUAN 6",
        konteks: `<p class="analysis-text-para">Buku panduan/modul cetak siswa (<em>Handbook</em>) yang telah direvisi sebanyak 7 halaman. Dokumen ini memuat materi ringkas mengenai teknologi dasar CNC, parameter pemotongan, dasar pemrograman, serta daftar alarm untuk mata pelajaran Teknik Pemesinan CNC yang ditargetkan bagi siswa SMK Kelas XI.</p>`,
        tujuan: `<p class="analysis-text-para">Menjadi panduan saku (<em>quick reference</em>) yang praktis bagi siswa untuk menguasai prosedur operasional dasar, sistem koordinat, dan fungsi kode G & M pada mesin bubut latih (EMCO TU-2A) dan mesin frais (EMCO TU-3A), sekaligus melatih kemandirian siswa dalam mendiagnosis galat program (<em>troubleshooting</em>).</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Cognitive Load Theory:</strong> Penyederhanaan konsep pemrograman ke dalam bentuk tabel matriks (Daftar Kode G dan M) berfungsi meminimalkan beban memori kerja siswa saat proses pengetikan program.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Error-Based Learning:</strong> Penyediaan "Bab VII: Daftar Alarm dan Penanganannya" memfasilitasi pembelajaran berbasis kesalahan, di mana siswa dilatih untuk memahami makna teknis di balik setiap kegagalan input (seperti Alarm A00 untuk salah kode G/M, atau A05 karena lupa M30).</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Perbaikan Sinkronisasi Administrasi:</strong> Tindakan revisi Anda sangat tepat. Kesalahan target jenjang pada draf sebelumnya (yang tertulis Kelas XII Semester 5) telah berhasil dikoreksi menjadi <strong>Kelas XI</strong> pada halaman sampul draf terbaru ini. Dokumen ini kini sepenuhnya selaras dengan struktur sasaran pada dokumen RPP Siklus 1, 2, dan 3 Anda.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Kemandirian *Troubleshooting*:</strong> Kehadiran panduan diagnosis kode alarm (A00 hingga A18) sangat krusial di bengkel karena memungkinkan guru untuk mengalihkan tanggung jawab pelacakan galat (<em>debugging</em>) langsung kepada siswa.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Absennya Visualisasi Aturan Tangan Kanan:</strong> Pada Bab 2.2, modul menjelaskan tentang pemetaan sumbu koordinat kartesius menggunakan "Aturan Tangan Kanan" untuk sumbu X dan Z. Menjelaskan konsep arah spasial (positif/negatif) murni hanya menggunakan teks akan sangat sulit dicerna oleh siswa. Modul ini wajib ditambahkan sketsa ilustrasi vektor sumbu X dan Z agar konsep pergerakan pahat tidak lagi abstrak.</li>
            </ul>`
    },
    media_s2_p4: {
        title: "ANALISIS MEDPEM PERTEMUAN 4",
        konteks: `<p class="analysis-text-para">Materi presentasi visual (Bahan Ajar Pertemuan 4) untuk mata pelajaran Teknik Pemesinan Non Konvensional kelas XI SMK. Materi ini disusun sebagai pengantar konseptual sebelum siswa melakukan praktik simulasi atau mengoperasikan mesin CNC Turning secara langsung.</p>`,
        tujuan: `<p class="analysis-text-para">Memberikan kerangka pemahaman dasar mengenai empat elemen krusial dalam prosedur pengoperasian mesin CNC Turning, yaitu pengaturan titik nol (<em>zero offset</em>), penentuan parameter pemotongan, pemahaman fungsi program CNC, dan penggunaan cairan pendingin (<em>coolant</em>).</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Macro-to-Micro Sequencing:</strong> Menggunakan pendekatan pembelajaran yang menyajikan gambaran besar (komponen utama operasional) terlebih dahulu sebelum nantinya siswa mempelajari detail teknis (seperti cara menghitung putaran <em>spindle</em> atau mengetik G-Code).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Teori Gestalt:</strong> Penggunaan elemen grafis roda gigi (<em>gear</em>) yang saling terhubung melambangkan bahwa keempat prosedur pengoperasian tersebut adalah satu kesatuan sistem mekanis yang tidak bisa dipisahkan; kegagalan pada satu elemen akan merusak hasil akhir pemesinan.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Visualisasi materi sangat ringkas, padat, dan langsung pada intinya (hanya 4 poin utama), sehingga tidak menimbulkan beban kognitif berlebih bagi siswa SMK.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Desain grafis roda gigi saling terhubung (<em>interlocking gears</em>) memberikan analogi visual yang bagus bahwa parameter mesin, program, dan <em>coolant</em> bekerja secara berkesinambungan.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Konten Terlalu Dangkal:</strong> Presentasi ini lebih menyerupai daftar isi daripada materi ajar utuh. Setiap poin (misalnya "Parameter Pemotongan") hanya diberi definisi satu kalimat, tanpa memberikan contoh apa saja parameter tersebut (misal: <em>feed rate, spindle speed, depth of cut</em>). Presentasi ini akan sangat bergantung pada ceramah lisan guru untuk bisa dimengerti.</li>
            </ul>`
    },
    media_s2_p5: {
        title: "ANALISIS MEDPEM PERTEMUAN 5",
        konteks: `<p class="analysis-text-para">Media pembelajaran berupa stimulus visual untuk sintaks Orientasi Masalah (<em>Problem Based Learning</em>) pada Pertemuan 4. Ditujukan bagi siswa kelas XI SMK Program Keahlian Teknik Pemesinan guna memantik diskusi mengenai materi Prosedur Persiapan dan Perawatan (<em>Maintenance</em>) Mesin CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Memvisualisasikan contoh-contoh kasus kegagalan mekanis secara menarik untuk memicu nalar kritis siswa dalam menganalisis hubungan sebab-akibat (kausalitas) antara pengabaian perawatan mesin dengan kerusakan fatal pada komponen CNC.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Cognitive Theory of Multimedia Learning (Mayer):</strong> Penggunaan ilustrasi gaya komik yang dipadukan dengan teks deskriptif singkat membantu menyajikan informasi kompleks menjadi lebih ringan dan mudah dicerna (<em>low cognitive load</em>) oleh siswa.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Pendekatan <em>Joyful</em> & <em>Meaningful</em>:</strong> Gaya visual kartun yang ekspresif menghadirkan nuansa belajar yang tidak kaku/menyenangkan (<em>joyful</em>), namun tetap membawa pesan teknis yang bermakna (<em>meaningful</em>) terkait risiko kerja di industri manufaktur.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Desain visual sangat atraktif, modern, dan sangat cocok dengan karakteristik visual siswa generasi saat ini. Ekspresi karakter operator yang kebingungan atau panik berhasil menghadirkan unsur empati dan urgensi dari masalah tersebut.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Penggunaan nomenklatur bilingual (Bahasa Indonesia dan Bahasa Inggris) pada label kerusakan (<em>Turret Position Sensor Fault, Coolant System Leakage</em>, dll.) sangat bagus untuk membiasakan siswa dengan istilah teknis internasional manual book mesin.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Ketidakakuratan Teknis Anatomi Mesin:</strong> Karena menggunakan gaya ilustrasi/kartun bebas (kemungkinan besar hasil <em>AI Generator</em>), anatomi mesin menjadi kurang akurat secara teknis. Kesalahan paling fatal ada pada panel <strong>"Kerusakan Pelumasan Bedways" (kiri bawah)</strong>, di mana gambar tersebut justru menampilkan struktur mesin <strong>CNC Milling/Frais vertikal</strong> (terlihat ada <em>spindle</em> pahat di atas <em>bed</em>), bukan mesin CNC Turning (Bubut horizontal) sesuai topik RPP Anda.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kurang Otentik:</strong> Meskipun menarik secara estetika, visual kartun menghilangkan detail-detail realistis yang sebenarnya dibutuhkan anak SMK Vokasi. Menggunakan dokumentasi foto asli bengkel (kerak oli nyata, sensor yang terbakar beneran, atau gram besi/chip yang menumpuk) akan memberikan <em>sense of reality</em> yang jauh lebih kuat dibandingkan ilustrasi komik.</li>
            </ul>`
    },
    media_s2_p6: {
        title: "ANALISIS MEDPEM PERTEMUAN 6",
        konteks: `<p class="analysis-text-para">Media pembelajaran berupa video tutorial berdurasi <strong>8 menit 48 detik</strong> pada kanal YouTube Muhammad Harist Mishbahuddin. Video ini dirancang sebagai panduan visual mandiri siswa kelas XI SMK untuk mendukung pelaksanaan proyek (PjBL) menggunakan simulator <em>Swansoft SSCNC (FANUC 0i T)</em>.</p>`,
        tujuan: `<p class="analysis-text-para">Menuntun siswa secara prosedural mengenai tahapan awal pengoperasian simulator, mulai dari inisialisasi software, pemasangan (<em>setting</em>) dimensi benda kerja dan pahat, pencarian titik referensi mesin (<em>homing</em>), hingga penentuan nilai kompensasi koordinat (<em>setting zero offset</em> sumbu X dan Z).</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Social Cognitive Theory (Bandura - Modeling):</strong> Menekankan proses <em>observational learning</em>, di mana rekaman aktivitas digital guru bertindak sebagai model perilaku teknis yang dapat diamati, diinternalisasi, dan ditiru secara akurat oleh siswa.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Instructional Scaffolding (Visual Pacing):</strong> Penempatan teks instruksi sekuensial di pojok kiri bawah layar berfungsi sebagai pemandu bertahap untuk mengurangi beban kognitif (<em>cognitive load</em>) siswa selama mencerna rangkaian tombol panel kontrol yang rumit.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Sangat ideal sebagai media pembelajaran mandiri yang fleksibel (<em>flipped classroom</em>); siswa yang mengalami ketertinggalan di lab komputer dapat memutar kembali (<em>rewind</em>) bagian operasional secara spesifik.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Kualitas visual tangkapan layar (<em>screen recording</em>) sangat jernih dan pergerakan kursor sangat fokus, sehingga mempermudah pelacakan posisi tombol navigasi pada panel CNC virtual.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Alur demonstrasi disusun secara runtut dan disiplin merepresentasikan urutan baku standar operasional prosedur (SOP) di industri manufaktur.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kesalahan Istilah (<em>Typo</em>) yang Permanen:</strong> Kesalahan ejaan teknis kembali terulang di dalam aset video ini. Teks penunjuk pada langkah kelima dan keenam tertulis secara keliru menjadi "<strong>Setting Zero Offsite</strong>", padahal nomenklatur baku manufaktur yang benar adalah "<strong>Setting Zero Offset</strong>".</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Ketiadaan Narasi Suara (<em>Voice Over</em>):</strong> Video hanya mengandalkan teks petunjuk singkat dan musik latar tanpa adanya penjelasan lisan dari guru mengenai <em>alasan</em> atau fungsi di balik setiap penekanan tombol. Hal ini membuat siswa dengan gaya belajar auditori akan kesulitan memahami esensi materi.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Konten Terhenti pada Fase Persiapan:</strong> Durasi video dihabiskan penuh hanya untuk melakukan penyetelan (<em>setting</em>) awal. Video berakhir tanpa sempat mendemonstrasikan proses inti berupa pengetikan baris kode program G (<em>G-code input</em>) maupun visualisasi pergerakan simulasi pemotongan benda kerja (<em>dry run/execution</em>).</li>
            </ul>`
    },
    lkm4: {
        title: "ANALISIS LKM PERTEMUAN 4",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM Pertemuan 4) berbasis Google Formulir untuk aktivitas diskusi kelompok pada fase <em>Problem Based Learning</em> (PBL). Ditujukan bagi siswa kelas XI SMK Program Keahlian Teknik Pemesinan dengan fokus materi <em>Standard Operating Procedure</em> (SOP) persiapan operasional dan perawatan harian (<em>maintenance</em>) mesin CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu kelompok siswa merajut urutan logis langkah-langkah persiapan mesin dan perawatannya, serta menalar secara kritis mengenai konsekuensi atau dampak teknis apabila prosedur tersebut diabaikan dalam ekosistem manufaktur.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Collaborative Problem Solving:</strong> Pemberian tugas menyusun prosedur yang diacak untuk dikerjakan secara berkelompok akan merangsang interaksi, debat sehat, dan negosiasi logika antar siswa (transfer pengetahuan sebaya).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Information Processing Theory:</strong> Soal tipe <em>jumbled sequence</em> (urutan acak) melatih memori prosedural siswa untuk mengonstruksi pemahaman tata urut (C3 - Mengaplikasikan), yang kemudian diperdalam dengan analisis kausalitas (C4 - Menganalisis) pada soal tipe esai.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Penggunaan model pertanyaan <em>jumbled sequence</em> (Soal 1 dan 3) merupakan strategi yang cerdas untuk menguji pemahaman SOP industri tanpa harus membuat siswa menghafal teks secara statis.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Keseimbangan taksonomi yang baik: memadukan penguasaan prosedur (<em>hard skill</em>) dengan analisis kausalitas / pemecahan masalah (Soal 2, 4, 5) yang menuntut siswa berpikir kritis tentang risiko kegagalan produksi.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kekurangan Teknis/UX Form:</strong> Google Formulir tidak memiliki fitur bawaan yang ideal untuk "mengurutkan teks". Jika Soal 1 dan 3 menggunakan kolom isian singkat (esai), siswa akan memasukkan jawaban dengan format yang tidak seragam (misal: "9-5-2..." atau "9,5,2" or bahkan mengetik kalimat utuh). Ini akan menyulitkan guru dalam melakukan rekapitulasi dan penilaian otomatis (<em>auto-grading</em>) di <em>spreadsheet</em>. Akan lebih aman jika diubah menggunakan fitur <em>Multiple Choice Grid</em> (Kisi Pilihan Ganda).</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kehilangan Variabel Identitas:</strong> Pada petunjuk awal disebutkan pengerjaan secara kelompok, namun di formulir hanya disediakan kolom "Nama Anggota". Ketiadaan kolom "Nomor/Nama Kelompok" dapat menimbulkan kerancuan pengelompokan data saat jawaban diunduh oleh guru.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kering Stimulus Visual:</strong> Meskipun berorientasi pada penyelesaian kasus seperti di RPP, LKM digital ini murni hanya berisi teks instruksi polos. Sebaiknya ditambahkan gambar pendukung (misalnya indikator <em>leveling coolant</em> mesin, tumpukan <em>chip</em> di <em>bed</em> mesin, atau antarmuka Homing di monitor) untuk mempermudah siswa membayangkan mesin aslinya.</li>
            </ul>`
    },
    lkm5: {
        title: "ANALISIS LKM PERTEMUAN 5",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM Pertemuan 5) berbasis Google Formulir untuk aktivitas diskusi kelompok pada fase <em>Problem Based Learning</em> (PBL). Ditujukan bagi siswa kelas XI SMK Program Keahlian Teknik Pemesinan, dengan fokus materi pemahaman prinsip Keselamatan dan Kesehatan Kerja (K3) serta regulasi Alat Pelindung Diri (APD) di lingkungan industri/bengkel.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu kelompok siswa untuk memahami konsep dasar keselamatan industri, mengidentifikasi potensi bahaya nyata, dan melatih nalar kritis (HOTS) dalam memecahkan masalah regulasi kedisiplinan kerja.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Taksonomi Bloom (Terintegrasi Penuh):</strong> Desain LKM ini sangat akademis karena secara sadar memetakan target hierarki pembelajaran pada ranah Kognitif (C2, C4, C5), Psikomotorik (P3), dan Afektif (A4) secara eksplisit di bagian tujuan.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Problem-Based Inquiry:</strong> Mengarahkan siswa dari pemahaman teoretis statis menuju pemikiran investigatif, di mana siswa diminta mendeteksi bahaya dan merumuskan kebijakan preventif (layaknya seorang <em>Safety Officer</em> di dunia industri).</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Penulisan rumusan tujuan pembelajaran sangat presisi dan berstandar tinggi karena berani mencantumkan level Taksonomi Bloom di setiap butir tujuannya.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Susunan gradasi soal (Soal 1 sampai 8) dirancang sangat logis dengan pendekatan <em>scaffolding</em>. Soal bergerak mulus dari tingkat dasar/LOTS (definisi konsep di Soal 1-3), menuju identifikasi analitis (Soal 4-5), hingga memuncak pada perancangan kebijakan/HOTS (Soal 8).</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Ketidakselarasan Instrumen dengan Tujuan Praktik:</strong> Tujuan poin ke-3 berbunyi "Mendemonstrasikan penggunaan APD secara benar (P3)". Mengingat ini adalah ranah keterampilan fisik/unjuk kerja, kompetensi ini <strong>tidak mungkin</strong> dievaluasi melalui tes tertulis (isian esai) di Google Form. Guru wajib menyiapkan instrumen terpisah berupa Lembar Observasi Praktik.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Hilangnya Stimulus Pemecahan Masalah:</strong> Berdasarkan langkah kerja di RPP Anda, Pertemuan 5 menggunakan sintaks PBL di mana guru menyajikan gambar kecelakaan kerja akibat tidak memakai APD. Sangat disayangkan tautan atau gambar kasus tersebut tidak disisipkan langsung ke dalam badan Google Form (misalnya diletakkan sebelum Soal 4) sebagai pemantik ingatan siswa saat berdiskusi.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Administrasi Data Kurang Lengkap:</strong> Seperti pada LKM 4, identitas kelengkapan administrasi <em>spreadsheet</em> kurang ideal. Formulir ini kehilangan kolom isian "Kelas" dan "Nomor Kelompok", yang rawan membuat data tercampur saat diunduh.</li>
            </ul>`
    },
    lkm6: {
        title: "ANALISIS LKM PERTEMUAN 6",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM Pertemuan 6) berbasis Google Formulir untuk aktivitas praktik individu pada fase <em>Project Based Learning</em> (PjBL). Ditujukan bagi siswa kelas XI SMK Program Keahlian Teknik Pemesinan sebagai instrumen evaluasi unjuk kerja pada materi pemrograman siklus bubut rata (<em>canned cycle</em> G71) menggunakan simulator mesin CNC.</p>`,
        tujuan: `<p class="analysis-text-para">Mendokumentasikan hasil unjuk kerja psikomotorik siswa secara mandiri dalam melakukan <em>setting zero offset</em>, mengetik blok kode program siklus G71, dan mengeksekusinya secara presisi pada perangkat lunak simulator sesuai dengan standar gambar kerja (<em>jobsheet</em>).</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Performance-Based Assessment (Penilaian Kinerja):</strong> Pengukuran kompetensi vokasional siswa melalui produk nyata (<em>work sample</em>) berupa bukti visual/tangkapan layar dari hasil simulasi pemesinan di layar komputer.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Experiential Learning:</strong> Fase <em>Active Experimentation</em> di mana siswa mentransformasikan pemahaman teori blok kode G71 ke dalam tindakan uji coba langsung secara iteratif di mesin virtual.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Mengintegrasikan tautan <em>jobsheet</em> (gambar kerja) secara langsung di dalam LKM, sangat praktis karena siswa tidak perlu membuka banyak jendela (<em>window</em>) saat sedang fokus mengoperasikan simulator.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Penguatan dimensi afektif industri dipertahankan pada petunjuk pengerjaan dengan menegaskan prinsip kedisiplinan, kejujuran, dan kejelasan dokumentasi mutu.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Tujuan Analisis Tidak Difasilitasi Form:</strong> Pada Tujuan nomor 3, siswa dituntut untuk "Menganalisis hasil praktik serta kendala...". Namun, pada kenyataannya, instrumen ini sama sekali tidak menyediakan kolom isian/esai bagi siswa untuk mengetikkan hasil analisis kendala mereka. Siswa hanya diberi satu tombol unggah foto.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kehilangan Evaluasi Pemahaman Sintaks:</strong> Merujuk pada desain RPP Pertemuan 6, siswa dituntut untuk bisa menjelaskan arti kode G71 dan parameter teknis seperti radius (U/R). Form ini kehilangan momentum penilaian formatif kognitif tersebut karena hanya menagih foto produk akhir tanpa ada pertanyaan pendalaman kode.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kapasitas Unggah Terlalu Terbatas:</strong> Batasan <em>upload</em> hanya <strong>1 file (maks 10 MB)</strong> sangat berisiko. Untuk materi yang kompleks seperti G71, guru idealnya membutuhkan bukti visual minimal berupa: (1) Jendela <em>G-code</em> yang diketik siswa, (2) Kurva lintasan pahat (<em>tool path</em>), dan (3) Hasil akhir 3D benda kerja. Memaksa siswa merangkum semuanya dalam 1 foto bisa membuat gambar menjadi sangat kecil dan sulit dikoreksi ketelitiannya.</li>
            </ul>`
    },
    bahan_ajar_1: {
        title: "ANALISIS BAHAN AJAR PERTEMUAN 1",
        konteks: `<p class="analysis-text-para">Bahan ajar/modul cetak komprehensif sebanyak 19 halaman untuk mata pelajaran Teknik Pemesinan CNC kelas XII SMK Konsentrasi Keahlian Teknik Pemesinan. Berfokus pada materi pengenalan komponen utama, fungsi mekanis, aspek keselamatan kerja (K3), serta prosedur operasional dasar yang menggunakan basis referensi mesin industri nyata tipe <em>ROMI C620</em>.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu peserta didik tingkat lanjut agar mampu mengidentifikasi secara visual, menjelaskan fungsi, dan menganalisis mekanisme kerja dari 17 komponen utama mesin CNC Turning berdasarkan stimulasi dokumen foto asli, sekaligus menanamkan kesadaran aturan keselamatan kerja (K3) industri.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Experiential and Contextual Learning:</strong> Menggunakan dokumentasi foto riil beresolusi tinggi dari mesin industri manufaktur asli (<em>ROMI C620</em>) untuk menjembatani kesenjangan teoretis. Strategi ini membantu siswa membangun kesiapan mental operasional (<em>transfer of learning</em>) sebelum menghadapi mesin sesungguhnya di bengkel.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Hierarchy of Learning (Scaffolding):</strong> Struktur bab disusun secara taksonomis, bergerak dari identifikasi visual makro (Tampak Luar/Bed), menuju pemahaman subsistem mekanis mikro (Headstock, Turret, Ball Screw), dan memuncak pada perancangan logika prosedural (Latihan Evaluasi & Lembar Identifikasi Mandiri).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Safety-Infused Instruction:</strong> Integrasi penanda simbol peringatan K3 khusus pada area komponen kritis (seperti aturan rasio geometris <em>L/D</em> untuk dukungan <em>tailstock</em>) membentuk kebiasaan berpikir berbasis manajemen risiko keselamatan.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Kualitas Keotentikan Visual yang Sangat Tinggi:</strong> Berbeda dengan media ilustrasi kartun, penggunaan foto-foto riil <em>close-up</em> komponen mekanis dari mesin industri asli memberikan representasi visual yang sangat akurat bagi anak SMK.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Integrasi Pengetahuan Pemrograman Praktis:</strong> Penyisipan catatan penekanan ("<em>Ingat! Koordinat X = Diameter (Bukan Radius)</em>") sangat bagus karena langsung menyasar miskonsepsi paling umum yang sering dilakukan siswa pemula.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Rubrik Penilaian yang Jelas:</strong> Bagian akhir modul dilengkapi dengan rubrik penilaian evaluasi mandiri yang objektif, mencakup aspek keterkaitan antar-komponen dan pemahaman K3 secara terukur.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Terdapat Beberapa Kesalahan Ketik (<em>Typo</em>) Istilah:</strong> Meskipun kualitas teksnya sudah jauh lebih baik dan profesional, masih ditemukan beberapa kesalahan ketik minor pada kata teknis di halaman awal, seperti tertulis "<strong>FOOT PET</strong>" di halaman 1 (seharusnya <em>Foot Pedal</em>) dan kata "<strong>TURRNING</strong>" di halaman 2 (kelebihan huruf 'R').</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Visualisasi Komponen Internal yang Tersembunyi:</strong> Modul ini menjelaskan komponen kritis yang menentukan akurasi posisi CNC seperti <em>Ball Screw</em>. Namun, karena modul ini hanya mengandalkan foto tampak luar, komponen <em>Ball Screw</em> ditandai tertutup/tersembunyi di dalam bodi mesin. Untuk komponen internal seperti ini, sebaiknya dilengkapi dengan gambar skematik/potongan 2D agar siswa bisa memahami cara kerja perputaran bola bajanya secara visual.</li>
            </ul>`
    },
    bahan_ajar_2: {
        title: "ANALISIS BAHAN AJAR PERTEMUAN 2 & 3",
        konteks: `<p class="analysis-text-para">Buku panduan/modul cetak siswa bertajuk <em>Handbook Siswa Teknik Pemesinan CNC Dasar</em> sebanyak 7 halaman. Modul ini mengacu pada standar Kurikulum 2013 Direktorat Pembinaan SMK untuk mata pelajaran Teknik Pemesinan CNC kelas XII Semester 5 Program Keahlian Teknik Mesin.</p>`,
        tujuan: `<p class="analysis-text-para">Menjadi referensi ringkas teoretis dan prosedural bagi siswa untuk menguasai konsep dasar kendali numerik, sistem koordinat kartesius, kalkulasi kecepatan pemotongan (<em>cutting parameter</em>), serta fungsi kode G & M pada mesin bubut didaktik EMCO TU-2A dan frais EMCO TU-3A.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Information Processing Theory:</strong> Menggunakan metode klasifikasi terstruktur (pembagian bab per sistem mesin dan tabelisasi fungsi baris kode G/M) untuk mempermudah transfer retensi memori dari pengetahuan deklaratif menuju pengetahuan prosedural.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Rule-Based Error Analysis:</strong> Penyusunan bab khusus mengenai kode kesalahan mekanis/program (Daftar Alarm A00-A18) menerapkan prinsip umpan balik korektif untuk melatih kemampuan diagnosis kesalahan teknis (<em>troubleshooting</em>) secara mandiri pada praktikan.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Fungsi Troubleshooting yang Sangat Praktis:</strong> Penjabaran rincian arti kode alarm (seperti makna galat A00 hingga A18) sangat bermanfaat sebagai panduan operasional di bengkel sehingga siswa tahu persis baris mana yang harus diperbaiki saat simulator macet.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Keseimbangan Kupasan Materi:</strong> Modul berhasil mencakup dua jenis pilar manufaktur sekaligus, yaitu mesin bubut (2 sumbu) dan frais (3 sumbu) dalam satu buku pegangan ringkas.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Akurasi Prinsip Pemrograman:</strong> Penegasan regulasi penentuan titik nol (sumbu X dihitung berdasarkan Diameter benda kerja sesuai fungsi dasar koordinat G92) dijabarkan dengan ringkas dan tepat.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Keterbatasan Visual Ilustrasi Pemosisian Sumbu:</strong> Bab II menjelaskan tentang Aturan Tangan Kanan (<em>Right-Hand Rule</em>) untuk sumbu kartesius X, Y, dan Z. Konsep arah spasial ini sangat abstrak bagi anak SMK dan <strong>wajib hukumnya</strong> dilengkapi dengan sketsa gambar tangan/vektor koordinat agar siswa tidak terbalik menentukan arah pergerakan positif dan negatif pahat.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Analisis Kasus Contoh Jawaban (Gambar):</strong> Lembar kuis Kahoot! pendukung yang Anda lampirkan menampilkan pertanyaan visual identifikasi komponen (<em>Chuck</em>). Modul <em>handbook</em> ini sama sekali tidak memiliki glosarium visual atau gambar bagian mesin yang representatif untuk mendukung siswa menjawab tipe soal identifikasi fisik benda seperti yang ditagih pada instrumen kuis tersebut.</li>
            </ul>`
    },
    rpp: {
        title: "ANALISIS RPP SIKLUS 1",
        konteks: `<p class="analysis-text-para">RPP untuk mata pelajaran Teknik Pemesinan Non Konvensional kelas XI SMK Muhammadiyah 3 Yogyakarta, topik pemrograman dan pengoperasian mesin CNC Turning menggunakan simulator Swansoft SSCNC (<em>FANUC 0i T</em>) selama 3 pertemuan (<strong>24 JP</strong>).</p>`,
        tujuan: `<p class="analysis-text-para">Memandu guru melaksanakan pembelajaran mendalam (<em>deep learning</em>) agar siswa mampu memahami fungsi komponen, melakukan <em>setting zero offset</em>, serta menginput program bubut lurus, bertingkat, dan tirus sesuai standar industri.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Sistem Among (Ki Hadjar Dewantara):</strong> Menitikberatkan peran guru sebagai pamong yang menuntun melalui asas <em>Ing Ngarsa Sung Tuladha</em>, <em>Ing Madya Mangun Karsa</em>, dan <em>Tut Wuri Handayani</em>.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Deep Learning Framework:</strong> Menggunakan tiga pilar utama yaitu <em>Mindful</em> (Berkesadaran), <em>Meaningful</em> (Bermakna), dan <em>Joyful</em> (Menggembirakan).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>PBL & PjBL (Student-Centered):</strong> Mengombinasikan <em>Problem Based Learning</em> untuk analisis masalah konseptual dan <em>Project Based Learning</em> untuk eksekusi proyek mandiri.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Pembelajaran Berdiferensiasi:</strong> Menggunakan hasil asesmen diagnostik sebagai acuan modifikasi proses dan penerapan bantuan rekan sejawat (<em>peer teaching</em>).</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Mengintegrasikan pendekatan <em>Deep Learning</em> (<em>Mindful-Meaningful-Joyful</em>) dan Sistem Among Tamansiswa secara eksplisit dan koheren di setiap aktivitas belajar.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Struktur model bertahap yang logis: menggunakan <strong>PBL</strong> untuk analisis masalah kerusakan komponen dan <strong>PjBL</strong> untuk eksekusi proyek mandiri pada simulator.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Mengakomodasi pembelajaran berdiferensiasi melalui metode <em>peer teaching</em> untuk menjembatani keberagaman kemampuan siswa.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Relevansi DUDIKA kurang sinkron, mencantumkan industri furnitur kayu (<strong>PT. Woodlands Furniture Industry</strong>) untuk kompetensi spesifik bubut logam CNC.</li>
            </ul>`
    },
    media: {
        title: "ANALISIS MEDPEM PERTEMUAN 1",
        konteks: `<p class="analysis-text-para">Bahan ajar/media pembelajaran visual berupa slide presentasi untuk mata pelajaran Teknik Pemesinan Non Konvensional kelas XI SMK, dengan fokus pada topik pengenalan anatomi dan bagian-bagian fisik utama mesin CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu siswa mengidentifikasi letak posisi fisik dan penamaan komponen pada mesin bubut CNC tipe <em>bench lathe</em> secara visual guna membangun kesiapan kognitif dasar sebelum melakukan pengoperasian langsung di bengkel.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Media Pembelajaran Visual (Spatial Labeling):</strong> Pemanfaatan representasi grafis berupa foto objek nyata yang dipadukan dengan teknik penomoran indeks untuk mempermudah retensi memori spasial siswa dalam mengenali struktur alat manufaktur.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Teori Kognitif (Pengetahuan Deklaratif):</strong> Berfokus pada penguasaan ranah kognitif dasar (C1-C2) untuk mengonstruksi pemahaman faktual mengenai bagian-bagian mesin sebelum siswa dihadapkan pada materi prosedural seperti <em>setting</em> koordinat atau pemrograman.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Menggunakan dokumentasi foto asli dari mesin riil tipe CK 6132 sehingga memberikan visualisasi yang valid, akurat, dan kontekstual sesuai dengan kondisi fisik bengkel.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Penyusunan daftar komponen dibuat melingkar secara berurutan untuk memudahkan pengecekan satu per satu.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Terjadi kesalahan fatal pada sinkronisasi penunjukan (<em>mismatch alignment</em>): Nomor pada daftar teks tidak sesuai dengan arah panah pada gambar (contoh: nomor 1 tertulis "Tombol emergency", namun panah menunjuk ke arah <em>casing</em>/lampu atas mesin).</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Kualitas penyuntingan gambar kurang rapi; terdapat simbol non-angka standar pada lingkaran nomor penunjuk di foto (seperti karakter '२' dan huruf 'A') yang bisa membingungkan siswa saat membaca instruksi.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Konten terlalu minimalis karena hanya menyajikan daftar nama komponen saja tanpa memberikan deskripsi penjelasan fungsi singkat dari masing-masing bagian mesin tersebut.</li>
            </ul>`
    },
    media2: {
        title: "ANALISIS MEDPEM PERTEMUAN 2 & 3",
        konteks: `<p class="analysis-text-para">Bahan ajar/media pembelajaran visual berbentuk slide presentasi untuk mata pelajaran Teknik Pemesinan Non Konvensional kelas XI SMK, dengan fokus pada pengenalan metode pemrograman serta perbedaan sistem koordinat pada mesin CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu siswa memahami perbedaan konseptual antara bahasa pemrograman manual dan otomatis, serta mampu membedakan karakteristik penentuan posisi titik koordinat antara metode inkremental dan absolut.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Teori Beban Kognitif (Cognitive Load Theory):</strong> Pemanfaatan analogi kontekstual non-teknis (rute perjalanan lokasi) untuk menyederhanakan konsep abstrak perpindahan sumbu koordinat agar beban kerja memori siswa tidak berlebih.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Dual-Coding Theory (Paivio):</strong> Mengombinasikan informasi verbal berupa teks definisi dengan representasi visual berupa grafik skematik jarak guna memperkuat retensi pemahaman konsep dasar siswa.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Penyajian analogi jarak geografis (Rumah-Pabrik-Stadion-Kantor) sangat cerdas dan memudahkan visualisasi perbedaan mendasar sistem koordinat tetap (absolut) dan koordinat berantai (inkremental).</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Klasifikasi jenis input data dijabarkan secara jelas sehingga siswa memahami perbedaan interaksi mekanis (tombol keyboard) dan interaksi perangkat lunak.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Terjadi kesalahan tata letak teks (<em>layout mismatch</em>) yang membingungkan: definisi sistem koordinat diletakkan di atas, namun judul metodenya ("INCREMENTAL" dan "ABSOLUT") justru berada di bawah teks penjelasan tersebut.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Referensi teknologi pada media otomatis belum diperbarui sepenuhnya untuk era manufaktur modern, karena masih mencantumkan media penyimpanan usang seperti disket dan kaset.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Ilustrasi grafis latar belakang (gambar kapal udara zeppelin) kurang relevan dengan bidang keahlian manufaktur teknik pemesinan maupun materi esensial CNC.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Materi masih murni teoretis umum dan belum dilengkapi dengan contoh konkret pengaplikasiannya pada gambar kerja bubut maupun struktur penulisan kode G (<em>G-code</em>).</li>
            </ul>`
    },
    lkm: {
        title: "ANALISIS LKM PERTEMUAN 1",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM 1) berbasis digital menggunakan Google Formulir untuk aktivitas kelompok pada Pertemuan 1 (fase <em>Problem Based Learning</em>). Ditujukan bagi siswa kelas XI SMK Program Keahlian Teknik Pemesinan untuk topik pengenalan komponen mesin CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu siswa secara kolaboratif untuk mengidentifikasi nama komponen fisik, menjelaskan fungsi operasionalnya, serta menganalisis pengaruh variasi komponen mekanis terhadap kualitas hasil kepresisian produk bubut CNC.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Konstruktivisme Sosial (Vygotsky):</strong> Penerapan instruksi pengerjaan secara berkelompok memberikan ruang bagi siswa untuk saling berdiskusi (<em>peer interaction</em>) dalam mengonstruksi pengetahuan faktual terkait anatomi mesin.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Taksonomi Bloom Terevisi (C2 hingga C4):</strong> Mengembangkan hierarki kognitif siswa mulai dari tingkat rendah seperti mengidentifikasi dan menjelaskan (C2-C3) pada soal 1-6, hingga tingkat analisis dampak komponen (C4) pada soal nomor 7.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Rumusan tujuan pembelajaran di bagian awal ditulis secara jelas, runtut, dan langsung mengarah pada target kompetensi yang terukur.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Menyertakan soal tipe analisis (Soal No. 7) yang menantang penalaran kritis siswa (<em>HOTS</em>) untuk mengaitkan fungsi mekanis komponen dengan kualitas hasil produksi.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Penggunaan platform digital memudahkan efisiensi pengumpulan data dan mempermudah guru melakukan perekaman asesmen formatif secara terpusat.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Penggunaan Google Formulir kurang ideal untuk tugas kolaboratif kelompok karena sistem teknisnya hanya berbasis satu akun pengirim, berisiko menyebabkan dominasi satu siswa (<em>free-rider effect</em>).</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Desain pertanyaan pada nomor 1 sampai 6 sangat monoton karena menggunakan pola kalimat perintah yang sama persis secara berulang tanpa adanya gradasi tingkat kesulitan soal (<em>scaffolding</em>).</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Terdapat inkonsistensi penggunaan bahasa (<em>bilingual</em>) pada pilihan jawaban soal nomor 7, mencampurkan istilah bahasa Inggris (<em>Machine Door, Bed Machine</em>) dengan bahasa Indonesia (<em>Kepala Lepas, Panel Control</em>).</li>
            </ul>`
    },
    lkm2: {
        title: "ANALISIS LKM PERTEMUAN 2",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM 2) berbasis Google Formulir untuk aktivitas praktik individu pada Pertemuan 2 (fase <em>Project Based Learning</em>). Ditujukan bagi siswa kelas XI SMK pada Konsentrasi Keahlian Teknik Pemesinan untuk materi prosedur <em>setting zero offset</em> dan eksekusi program CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu siswa secara mandiri untuk mengidentifikasi langkah prosedur, melakukan <em>setting zero offset</em> serta eksekusi program secara presisi, dan menganalisis kendala teknis yang terjadi selama proses praktik.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Experiential Learning (David Kolb):</strong> Menekankan konstruksi pengetahuan melalui pengalaman konkrit (<em>concrete experience</em>) melalui tindakan praktik langsung yang dilanjutkan dengan fase refleksi analisis kendala.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Performance-Based Assessment:</strong> Metode evaluasi performa otentik yang menilai ranah psikomotorik siswa melalui pembuktian hasil produk/artefak kerja (<em>work sample</em>) berupa dokumentasi visual hasil eksekusi program.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Berorientasi pada pembentukan budaya kerja industri dengan menekankan nilai kejujuran, tanggung jawab, serta kejelasan standar kualitas dokumentasi (instruksi foto tidak boleh buram).</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Memanfaatkan fitur digital <em>file upload</em> secara efektif untuk menyederhanakan pengumpulan bukti fisik performa praktik mandiri siswa.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Memuat tautan lembar kerja (<em>jobsheet</em>) langsung di dalam formulir untuk memudahkan akses referensi kerja siswa saat melakukan praktik secara <em>real-time</em>.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Ruang analisis reflektif belum terfasilitasi; formulir hanya menyediakan tombol unggah foto tanpa menyediakan kolom teks pemandu agar siswa bisa menguraikan "analisis hasil dan kendala" yang dialami sebagaimana tercantum pada target tujuan pembelajaran.</li>
            </ul>`
    },
    lkm3: {
        title: "ANALISIS LKM PERTEMUAN 3",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM 3) berbasis Google Formulir untuk aktivitas praktik individu pada Pertemuan 3 (fase <em>Project Based Learning</em>). Ditujukan bagi siswa kelas XI SMK pada Konsentrasi Keahlian Teknik Pemesinan untuk materi lanjutan prosedur <em>setting zero offset</em> dan eksekusi program CNC Turning (Job 2: bubut bertingkat dan tirus).</p>`,
        tujuan: `<p class="analysis-text-para">Memandu siswa secara mandiri untuk mengidentifikasi langkah prosedur lanjutan, melakukan <em>setting zero offset</em> dan eksekusi program secara presisi pada objek kerja kedua, serta menganalisis kendala teknis yang dialami selama proses pemesinan.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Experiential Learning (David Kolb):</strong> Menekankan pada perolehan kompetensi psikomotorik melalui siklus pengalaman konkrit (<em>hands-on experience</em>) yang diuji coba secara langsung pada simulator/mesin.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Performance-Based Assessment:</strong> Evaluasi kompetensi kejuruan yang validitasnya diukur berdasarkan bukti fisik hasil unjuk kerja (<em>work sample</em>) berupa produk akhir pemesinan yang terdokumentasi.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Penulisan istilah teknik pada judul dokumen sudah diperbaiki secara tepat dan konsisten menggunakan kata baku, yaitu "<strong>ZERO OFFSET</strong>".</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Petunjuk pengerjaan dirancang dengan sangat baik karena mengintegrasikan aspek afektif (kejujuran dan tanggung jawab) sebagai bagian dari pembentukan karakter budaya kerja industri.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Integrasi tautan <em>jobsheet</em> spesifik untuk Job 2 langsung di bawah butir soal memberikan kemudahan akses bagi siswa untuk melakukan verifikasi dimensi saat praktik.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Sama seperti LKM sebelumnya, instrumen ini belum sinkron dengan tujuan pembelajaran ketiga; tidak ada kolom esai/teks yang disediakan agar siswa dapat menguraikan "analisis hasil dan kendala" yang mereka hadapi.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Batasan kapasitas unggah file diperketat secara drastis dibanding LKM 2 (menjadi maks 1 file / 10 MB), hal ini berisiko membatasi siswa yang ingin menunjukkan detail tangkapan layar (misal: visualisasi posisi koordinat <em>X/Z</em> sekaligus tampilan akhir produk).</li>
            </ul>`
    },
    asesmen: {
        title: "ANALISIS ASESMEN PERTEMUAN 1",
        konteks: `<p class="analysis-text-para">Instrumen asesmen formatif digital menggunakan platform Kahoot! untuk akhir Pertemuan 1 (sintaks evaluasi PBL). Ditujukan bagi siswa kelas XI SMK Muhammadiyah 3 Yogyakarta pada materi pengenalan komponen fisik mesin CNC Turning.</p>`,
        tujuan: `<p class="analysis-text-para">Mengkur secara cepat (<em>real-time</em>) tingkat pemahaman kognitif mandiri siswa terkait identifikasi visual bentuk fisik komponen dan fungsi operasionalnya setelah melakukan diskusi kelompok.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Gamifikasi Pembelajaran (Joyful Learning):</strong> Integrasi elemen permainan (seperti poin kecepatan, papan peringkat, dan warna kontras) untuk menstimulasi keterlibatan aktif dan motivasi intrinsik siswa dalam ekosistem digital.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Asesmen Formatif (Assessment for Learning):</strong> Evaluasi instan di tengah proses pembelajaran untuk mendeteksi miskonsepsi secara dini dan memberikan umpan balik langsung (<em>immediate feedback</em>) sebelum masuk ke tahap praktik simulator.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Sangat kuat dalam mendukung pilar <em>Joyful Learning</em> (Menggembirakan) pada kerangka kerja <em>Deep Learning</em> serta memecah kejenuhan belajar teori manufaktur.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Penggunaan stimulasi visual gambar riil (<em>close-up</em> komponen <em>chuck</em>) sangat tepat untuk menguji ketajaman identifikasi spasial siswa di bengkel nyata.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Memudahkan guru mendapatkan data rekapitulasi ketercapaian kelas secara otomatis untuk menentukan langkah penguatan atau remedial.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Terdapat inkonsistensi nomenklatur pada pilihan jawaban, mencampurkan istilah bahasa Inggris (<em>Tailstock, Tool Turret, Chuck</em>) dengan bahasa Indonesia (<em>Bed Mesin</em>). Sebaiknya diseragamkan sesuai standar baku buku teks.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Batasan waktu (<em>time-constraint</em>) pengerjaan khas Kahoot! berisiko membuat siswa berkemampuan lambat merasa cemas, sehingga menjawab secara spekulatif (asal tebak cepat) tanpa proses penalaran kritis.</li>
            </ul>`
    },
    asesmen2: {
        title: "ANALISIS ASESMEN PERTEMUAN 2",
        konteks: `<p class="analysis-text-para">Instrumen penilaian proyek berupa lembar observasi perilaku siswa untuk mengukur sikap kerja saat melaksanakan praktik pemesinan pada simulator CNC Turning. Instrumen ini diisi oleh guru secara langsung di bengkel/lab komputer selama proses pengerjaan proyek berlangsung.</p>`,
        tujuan: `<p class="analysis-text-para">Mengevaluasi ranah afektif (perilaku dan karakter kerja) siswa berdasarkan empat indikator utama selama pengerjaan proyek CNC, serta mencocokkannya dengan hasil unjuk kerja teknis siswa yang dikumpulkan melalui bukti tangkapan layar komputer.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Affective Domain Assessment (Krathwohl):</strong> Penilaian yang menyasar pada internalisasi nilai, sikap, dan karakter kerja (seperti ketelitian dan kemandirian) yang krusial bagi keselamatan kerja serta kualitas produk di industri manufaktur.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Observational Authentic Assessment:</strong> Metode penilaian otentik di mana guru bertindak sebagai pengamat langsung perilaku nyata siswa untuk mengidentifikasi kebiasaan kerja (<em>work habits</em>) secara objektif di lapangan.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Berfokus pada aspek <em>soft skills</em> esensial dunia kerja manufaktur, yaitu kedisiplinan, kemandirian, ketelitian, dan kerjasama.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Menyediakan kolom "Catatan Guru" yang sangat bermanfaat untuk mendokumentasikan umpan balik kualitatif spesifik terkait kendala individu siswa.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Rumus perhitungan nilai menggunakan pembagi desimal (0,8) yang tidak umum. Selain itu, lembar ini belum dilengkapi dengan rubrik deskriptif yang menjabarkan indikator perilaku konkret untuk setiap tingkatan skor 1 sampai 4.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Analisis Kasus Contoh Jawaban (Gambar):</strong> Tangkapan layar komputer siswa menunjukkan kegagalan teknis berupa pesan <strong>ALARM MESSAGE: 506 OVER TRAVEL +X</strong>. Lembar instrumen yang diajukan ini murni hanya menilai sikap kerja saja, sehingga guru kekurangan rubrik penilaian psikomotorik (aspek produk/proses) untuk menilai kemampuan siswa dalam melakukan <em>troubleshooting</em> atau mengatasi galat koordinat tersebut.</li>
            </ul>`
    },
    asesmen_s2_p4: {
        title: "ANALISIS ASESMEN PERTEMUAN 4",
        konteks: `<p class="analysis-text-para">Instrumen asesmen formatif digital menggunakan platform Kahoot! untuk akhir Pertemuan 4 (sintaks evaluasi PBL). Ditujukan bagi siswa kelas XI SMK Muhammadiyah 3 Yogyakarta untuk menguji pemahaman regulasi K3 dan urutan baku <em>Standard Operating Procedure</em> (SOP) sebelum masuk ke area kerja pemesinan.</p>`,
        tujuan: `<p class="analysis-text-para">Mengukur daya kognitif mandiri peserta didik secara instan (<em>real-time</em>) dalam mengidentifikasi langkah preventif keselamatan dan tahapan awal persiapan pengoperasian mesin CNC Turning.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Gamifikasi Pembelajaran (Behaviorisme Digital):</strong> Menggunakan sistem penghargaan langsung (<em>immediate reward</em>) berupa poin kecepatan dan visualisasi papan peringkat untuk memperkuat respons stimulus siswa terhadap aturan K3 yang kaku.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Teori Kognitivisme (Skema Prosedural):</strong> Menguji kesiapan mental (<em>readiness</em>) siswa dalam memanggil kembali memori kerja terkait urutan prioritas tindakan antara keselamatan diri (APD) dengan urutan operasional mekanis mesin.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Pengondisian pilihan jawaban sudah sangat baik; menempatkan "Memastikan keselamatan kerja (APD)" sebagai opsi yang benar melatih insting mengutamakan K3 sebelum memegang peralatan produksi bengkel.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Sangat efektif untuk mengambil data evaluasi formatif secara cepat guna memetakan pemahaman awal kelas mengenai materi persiapan pemesinan.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kering Aspek Visual Kontekstual:</strong> Berbeda dengan kuis komponen sebelumnya yang menampilkan gambar pencekam asli, slide kuis ini masih kosong tanpa media gambar kerja riil di area pengeditan tengah. Sangat disarankan untuk memasukkan foto siswa yang memakai APD lengkap di bengkel sekolah agar soal lebih bermakna.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Potensi Miskonsepsi Pengkondisian Pilihan Jawaban:</strong> Pilihan jawaban lain (seperti "Mengatur titik nol" atau "Memasang benda kerja") sebenarnya merupakan bagian dari langkah persiapan mesin. Tanpa adanya penekanan kata kunci seperti "Langkah pertama <strong>yang paling utama</strong>", siswa berisiko terjebak memilih jawaban teknis karena mengira pertanyaan hanya menanyakan aspek mekanis.</li>
            </ul>`
    },
    asesmen_s2_p5: {
        title: "ANALISIS ASESMEN PERTEMUAN 5",
        konteks: `<p class="analysis-text-para">Instrumen asesmen formatif digital menggunakan platform Kahoot! untuk akhir Pertemuan 5 (sintaks evaluasi PBL). Ditujukan bagi siswa kelas XI SMK Muhammadiyah 3 Yogyakarta untuk menguji penguasaan fungsi Alat Pelindung Diri (APD) sebelum melaksanakan praktik mandiri di bengkel manufaktur.</p>`,
        tujuan: `<p class="analysis-text-para">Mengukur pemahaman kognitif siswa secara cepat dan interaktif mengenai kegunaan spesifik dari masing-masing alat keselamatan kerja guna membangun budaya <em>Safety First</em> di lingkungan sekolah dan DUDI.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Gamifikasi Pembelajaran (Joyful Learning):</strong> Pemanfaatan kuis berbasis kompetisi digital untuk meningkatkan keterlibatan emosional siswa, meminimalkan kejenuhan materi regulasi K3, serta merangsang ingatan jangka pendek.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Visual Literacy Theory:</strong> Penggunaan stimulus gambar riil produk APD (seperti helm keselamatan/<em>safety helmet</em>) untuk melatih kemampuan siswa mengomunikasikan wujud fisik benda dengan fungsi proteksi klinisnya di dunia nyata.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Penggunaan gambar APD yang sangat jelas, bersih, dan fokus (objek <em>safety helmet</em> modern) mempermudah siswa mengidentifikasi alat pelindung secara instan.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Opsi pilihan jawaban pengecoh (<em>distractor</em>) dibuat sangat homogen dan logis (sama-sama fungsi proteksi tubuh seperti mata, kaki, tangan, dan kepala), sehingga benar-benar menguji ketelitian berpikir siswa.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Sangat selaras dengan penguatan ranah afektif and kognitif (C2) terkait prinsip mendasar K3 yang tercantum dalam struktur program jaminan keselamatan kerja bengkel.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Keterbatasan Evaluasi Perilaku Mutu:</strong> Instrumen ini baru mampu menguji pemahaman fungsi di atas kertas (C2). Evaluasi ini belum bisa menjamin apakah siswa secara sadar mampu dan mau "mendemonstrasikan penggunaan APD secara benar (P3)" serta berdisiplin menerapkannya sepanjang waktu proyek berjalan.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kendala Keamanan Gambar (<em>Watermark</em>):</strong> Pada gambar helm yang disisipkan, terdapat teks angka transparan (<em>watermark</em> jualan online/hak cipta). Meskipun tidak mengganggu esensi soal, untuk dokumen portofolio akademik resmi PPG, ada baiknya menggunakan gambar bebas hak cipta yang lebih bersih.</li>
            </ul>`
    },
    asesmen_s2_p6: {
        title: "ANALISIS ASESMEN PERTEMUAN 6",
        konteks: `<p class="analysis-text-para">Instrumen asesmen afektif berupa lembar penilaian sikap (<em>project checklist</em>) yang digunakan oleh guru untuk mengamati perilaku murid kelas XI SMK Muhammadiyah 3 Yogyakarta secara langsung selama pengerjaan tugas individu simulasi CNC Turning di lab komputer.</p>`,
        tujuan: `<p class="analysis-text-para">Mengukur penanaman karakter dan kesiapan budaya kerja industri (<em>soft skills</em>) murid melalui empat indikator nilai, sekaligus menjadi filter pendukung objektivitas guru dalam mengevaluasi portofolio hasil tangkapan layar proyek mandiri yang dikumpulkan oleh murid.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Authentic Affective Assessment:</strong> Model penilaian otentik yang menyasar pada internalisasi nilai-nilai karakter kerja (seperti ketelitian dan kemandirian) yang krusial bagi seorang operator produksi di ekosistem manufaktur sesungguhnya.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Performance-Based Evidence:</strong> Penilaian unjuk kerja kejuruan yang validitasnya diukur berdasarkan pengamatan proses dipadukan dengan bukti otentik sampel produk (<em>work sample assessment</em>) berupa file/gambar hasil kerja digital murid.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Sangat baik dalam mengukur ranah non-akademis esensial industri seperti kedisiplinan dan ketelitian yang tidak bisa dinalar hanya dengan tes tertulis baku.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Menyediakan ruang "Catatan Guru" yang fleksibel untuk mendokumentasikan kendala spesifik individu murid sebagai bahan evaluasi dan refleksi pembelajaran mendalam.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kelemahan Matematika Rumus:</strong> Formula konversi nilai yang tertulis <em>Nilai = (Total Poin &times; 5) / 0.8</em> memiliki kesalahan logika perhitungan. Jika seorang murid mendapatkan skor maksimal (16 poin), hasil rumus tersebut justru menghasilkan nilai 100 (bukan nilai skala 100 standar). Batas pembagi desimal 0.8 tersebut sebaiknya diganti dengan total skor maksimal instrumen.</li>
            </ul>`
    },
    rpp_s3: {
        title: "ANALISIS RPP SIKLUS 3",
        konteks: `<p class="analysis-text-para">RPP mata pelajaran Teknik Pemesinan Non Konvensional kelas XI SMK Muhammadiyah 3 Yogyakarta. Dokumen untuk Siklus 3 ini membahas topik pemrograman siklus bubut kontur (G73) dan pembuatan program linier manual secara berkelompok serta individu menggunakan simulator Swansoft SSCNC (<em>FANUC 0i T</em>). Pembelajaran dirancang untuk 2 pertemuan (Pertemuan 7 dan 8) dengan total alokasi waktu <strong>16 JP</strong>.</p>`,
        tujuan: `<p class="analysis-text-para">Memandu guru melaksanakan pembelajaran mendalam (<em>deep learning</em>) agar siswa mampu menerapkan penyusunan kode program <em>canned cycle</em> G73 (bubut kontur/radius) secara presisi, serta mampu merancang, menginput, dan mengeksplorasi kalkulasi koordinat program linier bubut secara manual berdasarkan standardisasi dimensi gambar kerja (<em>jobsheet</em>).</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Sistem Among (Ki Hadjar Dewantara):</strong> Menuntun kemandirian praktikan melalui penanaman disiplin profesional (<em>Ing Ngarsa Sung Tuladha</em>), pendampingan aktif investigasi pemecahan kode sumbu koordinat (<em>Ing Madya Mangun Karsa</em>), dan pemicuan refleksi hasil pembubutan (<em>Tut Wuri Handayani</em>).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Deep Learning Framework:</strong> Internalisasi pemahaman bermakna melalui visualisasi pemecahan kasus kalkulasi parameter kontur industri (<em>Mindful</em> & <em>Meaningful</em>) serta pemberian pertanyaan pemantik spontan yang membangun kesadaran kritis (<em>Joyful</em>).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Model Project Based Learning (PjBL):</strong> Konstruksi kompetensi psikomotorik siswa secara runtun, mulai dari mengeksekusi proyek kontur radius individu (Pertemuan 7) hingga memuncak pada kolaborasi perancangan kode linier kelompok (Pertemuan 8).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Scaffolding & Peer Teaching:</strong> Pembagian porsi bantuan guru secara bertahap yang diselaraskan dengan keberagaman kemampuan siswa, dikombinasikan dengan pengaktifan siswa mahir sebagai asisten atau tutor sebaya bagi rekan kelompoknya.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Struktur penjenjangan proyek (PjBL) dari ranah kontur individu ke pengerjaan manual berkelompok tersusun secara logis untuk mematangkan daya kalkulasi koordinat siswa.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Pengondisian aktivitas pendampingan (<em>Ing Madya Mangun Karsa</em>) berjalan sangat baik dengan adanya instruksi guru untuk memberikan umpan balik personal yang konstruktif tanpa menghakimi siswa.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Pembudayaan karakter industri dituangkan secara konsisten lewat penanaman komitmen linimasa kerja (<em>timeline</em>) untuk meminimalkan waktu mati (<em>downtime</em>) produksi.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Kontradiksi Pengulangan Pertanyaan Apersepsi:</strong> Teks pertanyaan pemantik apersepsi guru pada awal Pertemuan 7 tertulis, "<em>Sudah paham siklus G71 dalam bubut CNC? ... Ada yang tau siklus G73?</em>". Namun, pada awal Pertemuan 8, teks pertanyaan apersepsi justru mundur kembali dengan menanyakan, "<em>Semua sudah memahami siklus G71 dan G73?</em>", hal ini membuat alur gradasi review materi menjadi kurang maju berjalan.</li>
            </ul>`
    },
    bahan_ajar_s3_p7: {
        title: "ANALISIS BAHAN AJAR PERTEMUAN 7 & 8",
        konteks: `<p class="analysis-text-para">Buku panduan/modul cetak siswa (<em>Handbook</em>) yang telah direvisi sebanyak 7 halaman. Dokumen ini memuat materi ringkas mengenai teknologi dasar CNC, parameter pemotongan, dasar pemrograman, serta daftar alarm untuk mata pelajaran Teknik Pemesinan CNC yang ditargetkan bagi siswa SMK Kelas XI pada Pertemuan 7 & 8.</p>`,
        tujuan: `<p class="analysis-text-para">Menjadi panduan saku (<em>quick reference</em>) yang praktis bagi siswa untuk menguasai prosedur operasional dasar, sistem koordinat, dan fungsi kode G & M pada mesin bubut latih (EMCO TU-2A) dan mesin frais (EMCO TU-3A), sekaligus melatih kemandirian siswa dalam mendiagnosis galat program (<em>troubleshooting</em>).</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Cognitive Load Theory:</strong> Penyederhanaan konsep pemrograman ke dalam bentuk tabel matriks (Daftar Kode G dan M) berfungsi meminimalkan beban memori kerja siswa saat proses pengetikan program.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Error-Based Learning:</strong> Penyediaan "Bab VII: Daftar Alarm dan Penanganannya" memfasilitasi pembelajaran berbasis kesalahan, di mana siswa dilatih untuk memahami makna teknis di balik setiap kegagalan input (seperti Alarm A00 untuk salah kode G/M, atau A05 karena lupa M30).</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Perbaikan Sinkronisasi Administrasi:</strong> Tindakan revisi Anda sangat tepat. Kesalahan target jenjang pada draf sebelumnya (yang tertulis Kelas XII Semester 5) telah berhasil dikoreksi menjadi <strong>Kelas XI</strong> pada halaman sampul draf terbaru ini. Dokumen ini kini sepenuhnya selaras dengan struktur sasaran pada dokumen RPP Siklus 1, 2, dan 3 Anda.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Kemandirian *Troubleshooting*:</strong> Kehadiran panduan diagnosis kode alarm (A00 hingga A18) sangat krusial di bengkel karena memungkinkan guru untuk mengalihkan tanggung jawab pelacakan galat (<em>debugging</em>) langsung kepada siswa.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Absennya Visualisasi Aturan Tangan Kanan:</strong> Pada Bab 2.2, modul menjelaskan tentang pemetaan sumbu koordinat kartesius menggunakan "Aturan Tangan Kanan" untuk sumbu X dan Z. Menjelaskan konsep arah spasial (positif/negatif) murni hanya menggunakan teks akan sangat sulit dicerna oleh siswa. Modul ini wajib ditambahkan sketsa ilustrasi vektor sumbu X dan Z agar konsep pergerakan pahat tidak lagi abstrak.</li>
            </ul>`
    },
    media_s3_p7: {
        title: "ANALISIS MEDPEM PERTEMUAN 7",
        konteks: `<p class="analysis-text-para">Media pembelajaran berupa video demonstrasi dan tutorial pengoperasian simulator mesin CNC Turning (Swansoft SSCNC FANUC 0i T). Video ini dirancang untuk membimbing siswa secara visual dan mandiri dalam mengeksekusi program pada Pertemuan 7 (Siklus 3).</p>`,
        tujuan: `<p class="analysis-text-para">Meningkatkan literasi visual dan pemahaman psikomotorik siswa tentang prosedur input kode G-Code dan simulasi pergerakan pahat sebelum melakukan praktik secara langsung, untuk meminimalisasi kesalahan operasional.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Observational Learning (Albert Bandura):</strong> Siswa belajar perilaku teknis dan standar operasional dengan mengamati model (video demonstrasi) secara seksama sebelum menirukannya secara presisi di stasiun kerja masing-masing.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Cognitive Load Theory:</strong> Pemisahan instruksi visual (video) dari instruksi teks membantu mengurangi beban kognitif berlebih, sehingga siswa lebih mudah merangkai pemahaman tata letak antarmuka simulator.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Video tutorial yang dapat diputar ulang memberikan keleluasaan bagi siswa untuk memelajari materi dengan ritme mereka sendiri (pembelajaran berdiferensiasi).</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Sangat efisien dalam mengurangi repetisi instruksi oleh guru kepada setiap kelompok di lab komputer.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Komunikasi Satu Arah:</strong> Media video tidak dapat mengoreksi secara instan (<em>immediate feedback</em>) apabila siswa salah menekan tombol yang berbeda dari instruksi layar.</li>
            </ul>`
    },
    media_s3_p8: {
        title: "ANALISIS MEDPEM PERTEMUAN 8",
        konteks: `<p class="analysis-text-para">Media pembelajaran berupa video tutorial (Bahan Ajar Pendukung Pertemuan 8) yang disematkan pada RPP Siklus 3. Ditujukan bagi siswa kelas XI SMK Muhammadiyah 3 Yogyakarta untuk memandu pengerjaan proyek kelompok/individu pada materi penulisan dan penginputan program linier secara manual pada simulator <em>Swansoft SSCNC (FANUC 0i T)</em>.</p>`,
        tujuan: `<p class="analysis-text-para">Memberikan visualisasi nyata bertahap (<em>step-by-step</em>) kepada siswa mengenai cara menghitung koordinat absolut, memasukkan baris kode perintah (<em>G-code list</em> dari G00, G01, hingga M30) melalui keyboard panel kendali emulasi, serta mengeksekusi program linier bubut bertingkat tanpa menggunakan kode siklus siklik.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Observational Learning (Bandura):</strong> Proses belajar melalui pemodelan visual di mana siswa mengamati demonstrasi digital guru, mengodekan urutan pengetikan instruksi ke dalam memori kerja, lalu mereplikasikannya pada komputer masing-masing.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Cognitive Load Theory (Pacing & Segmentation):</strong> Pemisahan materi pemrograman linier manual (yang membutuhkan ketelitian input baris per baris) ke dalam media video khusus untuk membantu siswa mengatur kecepatan belajarnya sendiri (<em>self-paced learning</em>) guna menghindari kelelahan mental.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Menjadi media peraga yang sangat efektif untuk meminimalisasi kebingungan siswa dalam memahami transisi dari coretan program tertulis di lembar <em>jobsheet</em> menuju pengetikan aktual di MDI (<em>Manual Data Input</em>) simulator.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Sangat mendukung strategi pembelajaran berdiferensiasi (<em>scaffolding</em>) karena berfungsi sebagai asisten guru virtual bagi siswa kelompok bawah yang membutuhkan repetisi petunjuk berulang-ulang.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Keterbatasan Aksesibilitas Tautan Digital (Filter System):</strong> Tautan video YouTube spesifik ini mengalami kendala teknis penayangan pihak ketiga karena adanya pembatasan hak cipta/filter korpus platform (<em>filtered search and discovery corpus</em>). Guru perlu memastikan file video mentah dibagikan alternatif via Drive kelas agar siswa tidak mengalami kegagalan akses saat praktik.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Risiko Ketergantungan Meniru Tanpa Penalaran:</strong> Karena video ini mendemonstrasikan penulisan program linier langkah demi langkah, terdapat risiko siswa hanya menyalin mentah-mentah (<em>copy-paste</em> visual) baris kode blok tanpa benar-benar memahami dasar perhitungan perubahan koordinat sumbu X dan Z yang melandasinya.</li>
            </ul>`
    },
    lkm7: {
        title: "ANALISIS LKM PERTEMUAN 7",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM Pertemuan 7) berbasis Google Formulir untuk aktivitas praktik individu pada fase <em>Project Based Learning</em> (PjBL). Ditujukan bagi siswa kelas XI SMK Program Keahlian Teknik Pemesinan sebagai instrumen pengumpulan bukti unjuk kerja pada materi pemrograman siklus bubut kontur/pola (<em>pattern repeating cycle</em> G73) menggunakan simulator CNC.</p>`,
        tujuan: `<p class="analysis-text-para">Mendokumentasikan hasil unjuk kerja psikomotorik siswa secara mandiri dalam melakukan prosedur <em>setting zero offset</em>, menginput struktur blok kode program siklus kontur G73, serta mengeksekusinya hingga berhasil menampilkan kurva lintasan pahat dan visualisasi produk 3D pada simulator secara presisi sesuai gambar kerja (<em>jobsheet</em>).</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Performance-Based Assessment (Penilaian Kinerja):</strong> Evaluasi kompetensi kejuruan yang diukur secara objektif melalui pengumpulan artefak atau bukti fisik hasil unjuk kerja (<em>work sample</em>) berupa dokumentasi visual pengoperasian simulator.</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Experiential Learning (Active Experimentation):</strong> Memberikan ruang bagi siswa untuk menguji cobakan kalkulasi parameter nilai kelonggaran kontur sumbu X dan Z secara berulang pada mesin virtual hingga mencapai dimensi yang valid.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Penyusunan instruksi pengerjaan sudah konsisten menanamkan aspek nilai afektif (kejujuran dan tanggung jawab) sebagai pengondisian standar budaya kerja industri manufaktur.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> Penyertaan tautan <em>jobsheet</em> spesifik langsung di dalam formulir mempermudah siswa melakukan verifikasi geometri radius/kontur tanpa harus membuka berkas fisik terpisah.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Evaluasi Kognitif Khas G73 Terabaikan:</strong> Karakteristik pemrograman G73 menuntut pemahaman matematika yang lebih rumit dibandingkan G71 (karena memerlukan penentuan parameter tebal pemakanan total dan jumlah langkah pengulangan). Form ini kehilangan momentum untuk menguji pemahaman teoritis siswa (C2) terkait arti kode parameter tersebut karena langsung menagih hasil akhir produk.</li>
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Pembatasan File Unggahan Terlalu Ketat:</strong> Kebijakan membatasi unggahan hanya <strong>1 file (maks 10 MB)</strong> kurang realistis untuk tugas kompleks. Guru akan kesulitan memvalidasi kebenaran proses jika siswa hanya mengunggah foto produk jadi 3D tanpa melampirkan foto lembar baris kode program (<em>G-code program list</em>) yang mereka ketik di panel kendali simulator.</li>
            </ul>`
    },
    lkm8: {
        title: "ANALISIS LKM PERTEMUAN 8",
        konteks: `<p class="analysis-text-para">Lembar Kerja Murid (LKM Pertemuan 8) berbasis Google Formulir yang disinkronkan dengan dokumen cetak <em>jobsheet</em> gambar teknik manufaktur bubut bertingkat dan tirus. Instrumen ini ditujukan bagi siswa kelas XI SMK Muhammadiyah 3 Yogyakarta pada fase proyek kelompok atau individu (<em>Project Based Learning</em> / PjBL) untuk menguji kompetensi kalkulasi titik koordinat kartesius dan penulisan struktur program bubut manual linier (<em>G-code</em>).</p>`,
        tujuan: `<p class="analysis-text-para">Mengevaluasi kompetensi psikomotorik dan literasi numerasi siswa dalam membaca dimensi geometri gambar kerja, menerjemahkannya ke dalam rincian titik koordinat absolut sumbu X (diameter) dan sumbu Z (panjang aksial), serta mengunggah bukti fisik hasil visualisasi eksekusi program pada perangkat lunak simulator CNC.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Spatial and Mathematical Literacy:</strong> Mengembangkan kecerdasan spasial praktikan untuk membaca dimensi diameter (∅) dan panjang pada proyeksi gambar teknik manufaktur, lalu mentransformasikannya ke dalam nilai koordinat sumbu mesin bubut (X sebagai representasi diameter dan Z sebagai koordinat panjang dihitung dari muka kanan benda kerja).</li>
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Criterion-Referenced Assessment:</strong> Evaluasi berbasis patokan standar baku kompetensi kejuruan. Validitas hasil ukur didasarkan pada ketepatan matematis baris program terhadap geometri produk, karena kesalahan input koordinat berisiko menyebabkan cacat dimensi produk (<em>reject</em>) atau tabrakan pahat (<em>crash</em>).</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Struktur Bukti Performa Ganda (<em>Double Evidence</em>):</strong> Formulir menagih dua bukti performa sekaligus, yaitu foto lembar penyusunan kode program tertulis dan foto visualisasi hasil simulator. Hal ini sangat baik agar guru dapat memverifikasi keselarasan proses dari tahap perencanaan hingga produk jadi.</li>
                <li><i class="fas fa-check" style="color: #059669;"></i> <strong>Gambar Kerja Sesuai Standar:</strong> Penggunaan gambar teknik <em>jobsheet</em> bubut bertingkat sudah menggunakan aturan proyeksi yang sesuai dengan standar baku industri, lengkap dengan penanda posisi titik nol benda kerja (<em>workpiece zero point</em>) di ujung muka kanan.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> <strong>Batasan Kapasitas Unggah Kurang Ideal:</strong> Tugas pembuatan program manual linier yang mencakup baris blok kode yang panjang (N10 hingga N300) membutuhkan ketelitian tinggi. Membatasi unggahan hanya berupa 1 foto dengan kapasitas maksimal 10 MB akan menyulitkan guru membaca kebenaran baris per baris teks kode program jika resolusi kamera handphone siswa kurang tajam saat memotret layar monitor lab komputer.</li>
            </ul>`
    },
    asesmen_s3_p7_8: {
        title: "ANALISIS ASESMEN PERTEMUAN 7 & 8",
        konteks: `<p class="analysis-text-para">Instrumen penilaian atau evaluasi untuk Pertemuan 7 & 8 pada Siklus 3 terkait materi pemrograman siklus bubut kontur G73 dan pemrograman linier manual menggunakan simulator CNC.</p>`,
        tujuan: `<p class="analysis-text-para">Mengevaluasi hasil pemahaman kognitif dan pencapaian keterampilan psikomotorik siswa dalam mengaplikasikan baris perintah siklus G73 dan pemrograman linier sesuai gambar kerja (<em>jobsheet</em>) yang telah dikerjakan secara individu maupun kelompok.</p>`,
        teori: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-book-open" style="color: #4f46e5;"></i> <strong>Performance-Based Assessment:</strong> Pengukuran otentik yang memfokuskan pada performa siswa dalam menyelesaikan tugas simulasi CNC secara komprehensif.</li>
            </ul>`,
        kelebihan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-check" style="color: #059669;"></i> Mampu memberikan umpan balik otentik terhadap tingkat penguasaan kompetensi pemesinan non-konvensional siswa secara riil.</li>
            </ul>`,
        kekurangan: `
            <ul class="analysis-feature-list">
                <li><i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i> Dibutuhkan waktu observasi yang lebih detail dari guru untuk menelaah kesesuaian baris program G-Code siswa secara individual.</li>
            </ul>`
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.querySelector('.close-modal');
    const iframe = document.getElementById('preview-iframe');
    const modalTitle = document.getElementById('modal-title');
    const modalDownload = document.getElementById('modal-download');
    const textContent = document.getElementById('analysis-text-content');
    
    // Tab Elements
    const analysisTabs = document.querySelectorAll('.analysis-tab-btn');
    const previewArea = document.querySelector('.modal-preview-area');
    
    let currentArtifactData = null;

    // Handle analysis tab switching
    analysisTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            analysisTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');
            
            // Render text
            if (currentArtifactData) {
                const tabKey = tab.getAttribute('data-atab'); // konteks, tujuan, kelebihan, kekurangan
                textContent.innerHTML = currentArtifactData[tabKey];
            }
        });
    });

    // Unified function to open modal with tabs
    window.openArtifactModal = (type, url) => {
        const data = analysisData[type];
        if (!data) return;
        
        currentArtifactData = data;
        
        // Setup Modal Header
        modalTitle.innerText = data.title;
        
        // Reset tabs to first tab (Konteks)
        analysisTabs.forEach(t => t.classList.remove('active'));
        const firstTab = document.querySelector('.analysis-tab-btn[data-atab="konteks"]');
        if (firstTab) firstTab.classList.add('active');
        
        // Render initial text
        textContent.innerHTML = data.konteks;
        
        // Handle Iframe vs Text-only logic
        const existingPlaceholder = previewArea.querySelector('.youtube-placeholder');
        if (existingPlaceholder) existingPlaceholder.remove();

        if (url) {
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                iframe.style.display = 'none';
                const videoId = url.split('/').pop();
                
                const placeholder = document.createElement('div');
                placeholder.className = 'youtube-placeholder';
                placeholder.innerHTML = `
                    <div class="yt-placeholder-content" style="
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://img.youtube.com/vi/${videoId}/maxresdefault.jpg') center/cover no-repeat;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        text-align: center;
                        padding: 2rem;
                    ">
                        <a href="https://youtu.be/${videoId}" target="_blank" class="yt-play-btn" style="
                            width: 80px;
                            height: 80px;
                            background: #ff0000;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 2.2rem;
                            box-shadow: 0 4px 20px rgba(255,0,0,0.4);
                            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                            margin-bottom: 1.5rem;
                            text-decoration: none;
                        " onmouseover="this.style.transform='scale(1.15) translateY(-3px)'; this.style.boxShadow='0 8px 25px rgba(255,0,0,0.7)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 20px rgba(255,0,0,0.4)';">
                            <i class="fas fa-play" style="margin-left: 6px;"></i>
                        </a>
                        <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.8); font-family: 'Outfit', sans-serif;">Video Tutorial CNC</h3>
                        <p style="font-size: 0.95rem; color: #e2e8f0; max-width: 420px; text-shadow: 0 1px 2px rgba(0,0,0,0.8); margin-bottom: 1.5rem; line-height: 1.5; font-family: 'Inter', sans-serif;">Pemutaran video ini diatur dengan pembatasan hak cipta atau protokol lokal. Klik tombol untuk membuka pemutar eksternal resmi.</p>
                        <a href="https://youtu.be/${videoId}" target="_blank" style="
                            background: rgba(255,255,255,0.15);
                            backdrop-filter: blur(10px);
                            border: 1px solid rgba(255,255,255,0.25);
                            color: #fff;
                            padding: 0.75rem 1.75rem;
                            border-radius: 30px;
                            text-decoration: none;
                            font-weight: 500;
                            transition: all 0.3s ease;
                            font-size: 0.9rem;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            font-family: 'Inter', sans-serif;
                            display: inline-flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='rgba(255,255,255,0.25)';" onmouseout="this.style.background='rgba(255,255,255,0.15)';">
                            Tonton di YouTube <i class="fas fa-external-link-alt" style="font-size: 0.75rem;"></i>
                        </a>
                    </div>
                `;
                previewArea.appendChild(placeholder);
                
                modalDownload.href = `https://youtu.be/${videoId}`;
                modalDownload.innerText = 'Tonton di YouTube';
            } else {
                iframe.style.display = 'block';
                iframe.src = url;
                modalDownload.href = url.replace('/preview', '/view');
                modalDownload.innerText = 'Unduh';
            }
            modalDownload.style.display = 'inline-block';
            modal.classList.remove('text-only');
        } else {
            iframe.style.display = 'block';
            iframe.src = '';
            modalDownload.style.display = 'none';
            modal.classList.add('text-only');
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.remove('text-only'); // Reset theme
            iframe.src = ''; // Clear iframe
            iframe.style.display = 'block'; // Reset iframe display
            const placeholder = previewArea.querySelector('.youtube-placeholder');
            if (placeholder) placeholder.remove();
        }, 300); // Wait for transition
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
    });
});
