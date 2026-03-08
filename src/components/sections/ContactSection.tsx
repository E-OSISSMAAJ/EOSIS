import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { schoolInfo } from "@/data/osisData";


export default function ContactSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section id="kontak" ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Dot grid pattern with parallax */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ y: dotY, backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div ref={sectionRef} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Hubungi Kami
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-osis-navy mb-4">Mari Terhubung</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Ikuti kami di Instagram untuk info terbaru
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href="https://linktr.ee/Osissmaaljannahh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
          >
            <Instagram className="w-6 h-6" />
            {schoolInfo.socialMedia.instagram}
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
