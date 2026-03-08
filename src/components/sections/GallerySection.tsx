import { useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useGoogleSheetPrograms } from "@/hooks/useGoogleSheetPrograms";
import { cn } from "@/lib/utils";

interface GalleryPhoto {
  url: string;
  programName: string;
  division: string;
}

const masonryHeights = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60"];

export default function GallerySection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { programs, isLoading } = useGoogleSheetPrograms();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Collect photos from programs, limit to 6
  const allPhotos: GalleryPhoto[] = programs.flatMap((program) =>
    (program.photos || []).map((url) => ({
      url,
      programName: program.name,
      division: program.division,
    }))
  ).slice(0, 6);

  return (
    <section id="galeri" ref={containerRef} className="relative bg-background overflow-hidden">
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full blur-3xl opacity-15"
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
            <ImageIcon className="w-4 h-4" />
            Galeri Kegiatan
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-osis-navy mb-4">Dokumentasi Kegiatan</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Momen-momen berharga dari berbagai kegiatan OSIS
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={cn("rounded-2xl bg-muted animate-pulse", masonryHeights[i % masonryHeights.length])} />
            ))}
          </div>
        ) : allPhotos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Belum ada foto kegiatan</div>
        ) : (
          <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {allPhotos.map((photo, index) => (
                <MasonryItem
                  key={`${photo.programName}-${index}`}
                  photo={photo}
                  index={index}
                  heightClass={masonryHeights[index % masonryHeights.length]}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

    </section>
  );
}

function MasonryItem({
  photo, index, heightClass, scrollYProgress,
}: {
  photo: GalleryPhoto; index: number; heightClass: string;
  scrollYProgress: any;
}) {
  const speed = ((index % 3) - 1) * 10;
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ y }}
      className={cn(
        "relative rounded-2xl overflow-hidden border border-primary/10 break-inside-avoid",
        heightClass
      )}
    >
      <img src={photo.url} alt={photo.programName} className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
}
