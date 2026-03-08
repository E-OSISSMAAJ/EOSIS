import { Division, OsisMember, Announcement, Program, GalleryItem, Statistic } from "./types";

// Divisions Data
export const divisions: Division[] = [
  {
    id: "bph",
    name: "Divisi BPH",
    description: "Pimpinan utama dan administrasi organisasi",
    icon: "Crown",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "islam",
    name: "Divisi Islam",
    description: "Program keagamaan dan pengembangan akhlak",
    icon: "Moon",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "alam",
    name: "Divisi Alam",
    description: "Kegiatan outdoor dan pelestarian lingkungan",
    icon: "Mountain",
    color: "from-green-500 to-lime-500",
  },
  {
    id: "sains",
    name: "Divisi Sains",
    description: "Inovasi, riset, dan pengembangan teknologi",
    icon: "Cpu",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "humas",
    name: "Divisi Humas",
    description: "Komunikasi, publikasi, dan hubungan masyarakat",
    icon: "Users",
    color: "from-rose-500 to-red-500",
  },
  {
    id: "kreatif",
    name: "Divisi Kreatif",
    description: "Ekspresi seni, musik, dan kreativitas",
    icon: "Palette",
    color: "from-purple-500 to-pink-500",
  },
];

// OSIS Members Data - 44 Pengurus
export const osisMembers: OsisMember[] = [
  // BPH - Badan Pengurus Harian (6 orang)
  { id: 1, name: "Syahril Nizhom Nur Al Qodri", position: "Ketua OSIS", division: "bph", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 2, name: "Pradhana Ramadhan", position: "Wakil Ketua OSIS", division: "bph", class: "11 IPA 2", photo: "/placeholder.svg" },
  { id: 3, name: "Cahaya Kurnia Dewi", position: "Sekretaris 1", division: "bph", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 4, name: "Zivanna Azzahra Syifa Prasetyo", position: "Sekretaris 2", division: "bph", class: "10 Y", photo: "/placeholder.svg" },
  { id: 5, name: "Hafeeza Azzahra Siregar", position: "Bendahara 1", division: "bph", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 6, name: "Maula Tsabitah Sharliz", position: "Bendahara 2", division: "bph", class: "11 IPA 1", photo: "/placeholder.svg" },

  // Divisi Islam (9 orang)
  { id: 7, name: "Ali Targhib Siregar", position: "Ketua Divisi", division: "islam", class: "10 Y", photo: "/placeholder.svg" },
  { id: 8, name: "Rafly Ahmad", position: "Wakil Ketua Divisi", division: "islam", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 9, name: "M. Zulfahmi Erdiansyah", position: "Anggota", division: "islam", class: "10 X", photo: "/placeholder.svg" },
  { id: 10, name: "Shofiyyah Maaziyatul Kayyisah", position: "Anggota", division: "islam", class: "10 Y", photo: "/placeholder.svg" },
  { id: 11, name: "Ameera Fauziyah Agniasto", position: "Anggota", division: "islam", class: "10 X", photo: "/placeholder.svg" },
  { id: 12, name: "Abdurrahman Ikhsanurrasyad", position: "Anggota", division: "islam", class: "10 Z", photo: "/placeholder.svg" },
  { id: 13, name: "M. Farhan", position: "Anggota", division: "islam", class: "11 IPA 2", photo: "/placeholder.svg" },
  { id: 14, name: "Aisyah Hasanah Putri", position: "Anggota", division: "islam", class: "11 IPA 2", photo: "/placeholder.svg" },
  { id: 15, name: "Tsamara Nasywa", position: "Anggota", division: "islam", class: "11 IPA 1", photo: "/placeholder.svg" },

  // Divisi Alam (8 orang)
  { id: 16, name: "Faizah Hadya Ayska", position: "Ketua Divisi", division: "alam", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 17, name: "M. Sulthan Rafi Al Fath", position: "Wakil Ketua Divisi", division: "alam", class: "11 IPA 1", photo: "/placeholder.svg" },
  { id: 18, name: "Putri Jasmine Chikaerya", position: "Anggota", division: "alam", class: "10 X", photo: "/placeholder.svg" },
  { id: 19, name: "Rayyan Afwan Prabhaswara", position: "Anggota", division: "alam", class: "10 Y", photo: "/placeholder.svg" },
  { id: 20, name: "Rakhi Anugrah Putra", position: "Anggota", division: "alam", class: "10 X", photo: "/placeholder.svg" },
  { id: 21, name: "Indira Falisha Octypravintya", position: "Anggota", division: "alam", class: "10 X", photo: "/placeholder.svg" },
  { id: 22, name: "Narpati Abimanyu Cayapata Kumara Suseno", position: "Anggota", division: "alam", class: "10 Y", photo: "/placeholder.svg" },
  { id: 23, name: "Ghani Altamis Putra R.", position: "Anggota", division: "alam", class: "10 X", photo: "/placeholder.svg" },

  // Divisi Sains (7 orang)
  { id: 24, name: "Nabil Muhammad Ali Hilabi", position: "Ketua Divisi", division: "sains", class: "10 Y", photo: "/placeholder.svg" },
  { id: 25, name: "Salsabila Wiranda Satya", position: "Wakil Ketua Divisi", division: "sains", class: "11 IPA 1", photo: "/placeholder.svg" },
  { id: 26, name: "Syrena Filardha Hastoro", position: "Anggota", division: "sains", class: "10 Z", photo: "/placeholder.svg" },
  { id: 27, name: "Raisa Adila Fakhriah", position: "Anggota", division: "sains", class: "10 Z", photo: "/placeholder.svg" },
  { id: 28, name: "Callysta Putri Kinanthi", position: "Anggota", division: "sains", class: "10 Z", photo: "/placeholder.svg" },
  { id: 29, name: "Erlyn Ayana Amabella", position: "Anggota", division: "sains", class: "11 IPA 2", photo: "/placeholder.svg" },
  { id: 30, name: "M. Rasyid Al Hakim", position: "Anggota", division: "sains", class: "10 X", photo: "/placeholder.svg" },

  // Divisi Humas (7 orang)
  { id: 31, name: "Bilqis Mahira Mawardi", position: "Ketua Divisi", division: "humas", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 32, name: "Syawntel Baliana Hastoro", position: "Wakil Ketua Divisi", division: "humas", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 33, name: "Ayesha Khizie", position: "Anggota", division: "humas", class: "10 Y", photo: "/placeholder.svg" },
  { id: 34, name: "Intizar Najla Alvianshar", position: "Anggota", division: "humas", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 35, name: "Hazhizhi Athaillah Audi Pane", position: "Anggota", division: "humas", class: "10 Z", photo: "/placeholder.svg" },
  { id: 36, name: "Sesario Putra Ahmad", position: "Anggota", division: "humas", class: "10 X", photo: "/placeholder.svg" },
  { id: 37, name: "Tyvanie Rahman", position: "Anggota", division: "humas", class: "10 Z", photo: "/placeholder.svg" },

  // Divisi Kreatif (7 orang)
  { id: 38, name: "Salsabila Zahra Anjani", position: "Ketua Divisi", division: "kreatif", class: "11 IPA 2", photo: "/placeholder.svg" },
  { id: 39, name: "Tenaya Aisa Selvira", position: "Wakil Ketua Divisi", division: "kreatif", class: "11 IPS", photo: "/placeholder.svg" },
  { id: 40, name: "Vania Adzka", position: "Anggota", division: "kreatif", class: "10 Y", photo: "/placeholder.svg" },
  { id: 41, name: "Syifa Sauqiya Ayudiani", position: "Anggota", division: "kreatif", class: "10 Z", photo: "/placeholder.svg" },
  { id: 42, name: "Abyan Rajendra Sakha", position: "Anggota", division: "kreatif", class: "10 Y", photo: "/placeholder.svg" },
  { id: 43, name: "Hanif Arkan Pramono", position: "Anggota", division: "kreatif", class: "10 X", photo: "/placeholder.svg" },
  { id: 44, name: "Hafuza Afzar Narmadi", position: "Anggota", division: "kreatif", class: "10 X", photo: "/placeholder.svg" },
];

// Announcements Data
export const announcements: Announcement[] = [
  {
    id: 1,
    title: "Pendaftaran Lomba Debat Antar Kelas Dibuka!",
    content: "OSIS mengadakan lomba debat antar kelas dengan tema 'Generasi Digital yang Berakhlak'. Pendaftaran dibuka mulai 20 Januari - 5 Februari 2025.",
    category: "event",
    date: "2025-01-15",
    image: "/placeholder.svg",
    isImportant: true,
  },
  {
    id: 2,
    title: "Jadwal Kajian Rutin Bulan Februari",
    content: "Kajian rutin akan dilaksanakan setiap Jumat pagi dengan tema berbeda setiap minggunya. Simak jadwal lengkapnya di sini.",
    category: "info",
    date: "2025-01-10",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Pengumuman Hasil Seleksi Anggota Baru OSIS",
    content: "Selamat kepada siswa-siswi yang telah lulus seleksi menjadi anggota baru OSIS periode 2025/2026.",
    category: "penting",
    date: "2025-01-05",
    image: "/placeholder.svg",
    isImportant: true,
  },
  {
    id: 4,
    title: "Bakti Sosial ke Panti Asuhan",
    content: "OSIS akan mengadakan kegiatan bakti sosial ke Panti Asuhan Al-Hikmah pada tanggal 25 Januari 2025.",
    category: "event",
    date: "2025-01-08",
    image: "/placeholder.svg",
  },
];

// Programs Data
export const programs: Program[] = [
  // Divisi Islam
  { id: 1, name: "Mengaji Pagi", description: "Kegiatan mengaji rutin setiap pagi sebelum pembelajaran dimulai.", division: "islam", status: "ongoing", progress: 70, icon: "BookOpen" },
  { id: 2, name: "Kultum Ramadhan", description: "Kultum singkat selama bulan Ramadhan untuk menambah wawasan keislaman.", division: "islam", status: "planning", progress: 20, icon: "Mic" },
  { id: 3, name: "Festival Ramadhan", description: "Rangkaian kegiatan menyambut dan memeriahkan bulan Ramadhan.", division: "islam", status: "planning", progress: 15, icon: "Moon" },
  { id: 4, name: "I'tikaf Ramadhan", description: "Kegiatan i'tikaf bersama di sekolah pada akhir Ramadhan.", division: "islam", status: "planning", progress: 10, icon: "Heart" },

  // Divisi Alam
  { id: 5, name: "Teachers Day", description: "Perayaan Hari Guru untuk mengapresiasi dedikasi para guru.", division: "alam", status: "completed", progress: 100, icon: "GraduationCap" },
  { id: 6, name: "Liga Olahraga", description: "Kompetisi olahraga antar kelas dalam berbagai cabang.", division: "alam", status: "planning", progress: 25, icon: "Trophy" },
  { id: 7, name: "Classmeet", description: "Pertandingan dan perlombaan antar kelas di akhir semester.", division: "alam", status: "planning", progress: 20, icon: "Swords" },
  { id: 8, name: "LDKS", description: "Latihan Dasar Kepemimpinan Siswa untuk pengurus OSIS baru.", division: "alam", status: "planning", progress: 10, icon: "Mountain" },

  // Divisi Sains
  { id: 9, name: "Mengisi Mading", description: "Pengelolaan dan pengisian majalah dinding sekolah secara rutin.", division: "sains", status: "ongoing", progress: 60, icon: "Newspaper" },
  { id: 10, name: "Website OSIS", description: "Pengembangan dan pengelolaan website resmi OSIS.", division: "sains", status: "ongoing", progress: 80, icon: "Globe" },
  { id: 11, name: "AJ Star", description: "Program penghargaan siswa berprestasi setiap bulan.", division: "sains", status: "ongoing", progress: 50, icon: "Star" },
  { id: 12, name: "Rise and Shine", description: "Program motivasi dan pengembangan diri siswa.", division: "sains", status: "planning", progress: 30, icon: "Sunrise" },
  { id: 13, name: "Database Sponsor", description: "Pengelolaan database sponsor untuk mendukung kegiatan OSIS.", division: "sains", status: "ongoing", progress: 45, icon: "Database" },

  // Divisi Humas
  { id: 14, name: "AJ Radio", description: "Radio sekolah yang menyiarkan informasi dan hiburan.", division: "humas", status: "ongoing", progress: 65, icon: "Radio" },
  { id: 15, name: "Studi Banding", description: "Kunjungan ke sekolah lain untuk bertukar pengalaman.", division: "humas", status: "planning", progress: 15, icon: "Building" },
  { id: 16, name: "AJ Talks", description: "Talkshow dan diskusi dengan narasumber inspiratif.", division: "humas", status: "planning", progress: 20, icon: "Podcast" },
  { id: 17, name: "Message Box", description: "Wadah aspirasi siswa untuk menyampaikan saran dan masukan.", division: "humas", status: "ongoing", progress: 55, icon: "MessageSquare" },
  { id: 18, name: "AJ Promed", description: "Promosi media dan dokumentasi kegiatan OSIS.", division: "humas", status: "ongoing", progress: 70, icon: "Camera" },

  // Divisi Kreatif
  { id: 19, name: "Desain & Dekorasi", description: "SOP support desain dan dekorasi untuk seluruh kegiatan divisi OSIS.", division: "kreatif", status: "ongoing", progress: 75, icon: "Palette" },

  // Divisi BPH
  { id: 20, name: "Festival Pelajar Unggulan (FPU)", description: "Festival besar tahunan menampilkan prestasi dan karya unggulan siswa.", division: "bph", status: "planning", progress: 25, icon: "Award" },
  { id: 21, name: "Magnifest", description: "Event akbar perayaan dan pameran kreativitas siswa.", division: "bph", status: "planning", progress: 20, icon: "Sparkles" },
  { id: 22, name: "Pelajar Berpijar", description: "Program pengembangan karakter dan kepemimpinan pelajar.", division: "bph", status: "planning", progress: 15, icon: "Flame" },
];

// Gallery Data
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Upacara Pelantikan OSIS 2024/2025",
    image: "/placeholder.svg",
    category: "ceremony",
    date: "2024-09-15",
  },
  {
    id: 2,
    title: "Kajian Rutin Jumat",
    image: "/placeholder.svg",
    category: "islamic",
    date: "2024-10-20",
  },
  {
    id: 3,
    title: "Pendakian Gunung Merbabu",
    image: "/placeholder.svg",
    category: "outdoor",
    date: "2024-11-10",
  },
  {
    id: 4,
    title: "Lomba Robotik Tingkat Kota",
    image: "/placeholder.svg",
    category: "science",
    date: "2024-12-05",
  },
  {
    id: 5,
    title: "Pentas Seni Akhir Tahun",
    image: "/placeholder.svg",
    category: "art",
    date: "2024-12-20",
  },
  {
    id: 6,
    title: "Bakti Sosial di Panti Asuhan",
    image: "/placeholder.svg",
    category: "social",
    date: "2024-10-15",
  },
];

// Statistics Data
export const statistics: Statistic[] = [
  { id: 1, label: "Pengurus Aktif", value: 44, icon: "Users" },
  { id: 2, label: "Program Kerja", value: 12, icon: "Target" },
  { id: 3, label: "Event Tahunan", value: 8, icon: "Calendar" },
  { id: 4, label: "Prestasi", value: 25, icon: "Trophy" },
];

// School Info
export const schoolInfo = {
  name: "SMA IAS AL-JANNAH",
  fullName: "Sekolah Menengah Atas Islam Al-Jannah",
  osisName: "E-OSIS",
  period: "2025/2026",
  address: "Jl. Pendidikan No. 1, Kota Depok, Jawa Barat",
  phone: "+62 21 1234 5678",
  email: "osis@sma-aljannah.sch.id",
  socialMedia: {
    instagram: "@osis.smaaljannah",
    youtube: "OSIS SMA AL-JANNAH",
    tiktok: "@osis.smaaljannah",
  },
  vision: "Terbangunnya OSIS yang bertakwa, bertanggung jawab, komunikatif, dan kolaboratif.",
  missions: [
    "Menumbuhkan ketakwaan kepada Allah SWT",
    "Membangun karakter pengurus OSIS yang bertanggung jawab",
    "Membangun komunikasi yang terbuka dan menghargai pendapat semua siswa",
    "Membangun kolaborasi yang harmonis",
    "Mengembangkan potensi, bakat, dan kreativitas siswa",
  ],
};
