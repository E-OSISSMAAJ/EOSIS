import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { schoolInfo } from "@/data/osisData";
import { Button } from "@/components/ui/button";


export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  
  const blobScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="beranda"
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Background Image - Parallax Layer 0 */}
      <motion.div className="absolute -top-[20%] left-0 right-0 bottom-0 z-0 overflow-hidden" style={{ y: bgY }}>
        <img
          src="https://iili.io/qdbUmhX.jpg"
          alt="Sekolah Al-Jannah"
          className="w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </motion.div>

      {/* Decorative diagonal lines - Parallax Layer 1 */}
      <motion.div className="absolute inset-0 z-[1] overflow-hidden" style={{ scale: blobScale }}>
        <div className="absolute top-[20%] -right-20 w-[600px] h-[1px] bg-primary/10 rotate-[30deg]" />
        <div className="absolute top-[35%] -right-10 w-[500px] h-[1px] bg-primary/10 rotate-[30deg]" />
        <div className="absolute top-[50%] -left-20 w-[400px] h-[1px] bg-primary/10 -rotate-[25deg]" />
        <div className="absolute bottom-[30%] -left-10 w-[300px] h-[1px] bg-primary/10 -rotate-[25deg]" />
      </motion.div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Upper content area */}
        <motion.div
          style={{ y: contentY, opacity: textOpacity }}
          className="flex-1 flex items-end sm:items-center pb-12 sm:pb-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-5 gap-4 sm:gap-8 items-center pt-20 sm:pt-24">
            {/* Left: Text Content - 3 cols */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-8">

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] text-osis-navy leading-[0.85] tracking-tighter"
              >
                {schoolInfo.osisName}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="max-w-md"
              >
                <p className="font-heading font-semibold text-xl text-foreground/70 mb-2">
                  {schoolInfo.name}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Organisasi Siswa Intra Sekolah yang berkomitmen untuk mengembangkan
                  potensi siswa dalam aspek keimanan, keilmuan, dan kepemimpinan.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Button
                  size="lg"
                  onClick={() => handleScrollToSection("tentang")}
                  className="rounded-full px-6 py-4 sm:px-8 sm:py-6 text-base font-semibold group"
                >
                  Jelajahi Lebih Lanjut
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleScrollToSection("struktur")}
                  className="rounded-full px-6 py-4 sm:px-8 sm:py-6 text-base font-semibold border-foreground/20 text-foreground hover:bg-foreground/5"
                >
                  Lihat Pengurus
                </Button>
              </motion.div>
            </div>

            {/* Right: School Image with diagonal clip - 2 cols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ y: imageY }}
              className="lg:col-span-2 hidden lg:block relative"
            >
              <div
                className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-primary/10"
                style={{ clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
              >
                <img
                  src="https://iili.io/qdbUmhX.jpg"
                  alt="Sekolah Al-Jannah"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
              </div>
              {/* Floating OSIS logo */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl bg-background border border-primary/10 shadow-lg flex items-center justify-center overflow-hidden"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="https://iili.io/qdb67u2.png" alt="Logo OSIS" className="w-14 h-14 object-contain" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
