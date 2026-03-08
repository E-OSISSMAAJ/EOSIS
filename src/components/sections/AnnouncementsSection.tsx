import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LINKTREE_URL = "https://linktr.ee/Osissmaaljannahh";

export default function AnnouncementsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    // Load Elfsight script once
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="pengumuman" ref={containerRef} className="relative bg-background overflow-hidden">
      <motion.div
        className="absolute top-[30%] left-[-5%] w-[350px] h-[350px] rounded-full blur-3xl opacity-15"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]),
          background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
        }}
      />

      <div ref={sectionRef} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Instagram className="w-4 h-4" />
            Instagram
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-osis-navy mb-4">
            Info Terbaru
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Post terbaru dari Instagram @osis.smaaljannah
          </p>
        </motion.div>

        {/* Elfsight Instagram Feed Widget */}
        {/* Ganti class di bawah dengan widget ID dari Elfsight kamu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
        >
          <div className="elfsight-app-64146904-d805-4003-8f60-00325216fc11" data-elfsight-app-lazy />
          {/* Petunjuk: Daftar gratis di elfsight.com, buat widget Instagram Feed,
              masukkan username @osis.smaaljannah, lalu ganti class di atas
              dengan class yang diberikan Elfsight (contoh: elfsight-app-abc12345-...) */}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            Follow @osis.smaaljannah
          </a>
        </motion.div>
      </div>
    </section>
  );
}
