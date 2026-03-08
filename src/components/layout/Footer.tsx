import { ArrowUp, Heart } from "lucide-react";
import { schoolInfo } from "@/data/osisData";

const footerLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Struktur", href: "#struktur" },
  { label: "Program", href: "#program" },
  { label: "Pengumuman", href: "#pengumuman" },
  { label: "Galeri", href: "#galeri" },
  { label: "Kontak", href: "#kontak" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-osis-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/20">
              <img src="https://iili.io/qdb67u2.png" alt="Logo OSIS" className="w-full h-full object-cover" />
            </div>
            <span className="font-heading font-bold text-sm">{schoolInfo.osisName}</span>
            <span className="text-white/40 text-sm hidden sm:inline">• {schoolInfo.name}</span>
          </div>

          {/* Links - Horizontal */}
          <nav className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white/50 hover:text-white transition-colors text-sm">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by Divisi Sains
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-osis-navy text-white border border-white/20 shadow-lg hover:bg-primary transition-colors"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
