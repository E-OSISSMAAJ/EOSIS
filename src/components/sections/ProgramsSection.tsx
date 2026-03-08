import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  BookOpen, Mic, Moon, Heart, GraduationCap, Trophy, Swords, Mountain,
  Newspaper, Globe, Star, Sunrise, Database, Radio, Building, Podcast,
  MessageSquare, Camera, Palette, Award, Sparkles, Flame, ImageIcon, ArrowRight,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { divisions } from "@/data/osisData";
import { useGoogleSheetPrograms } from "@/hooks/useGoogleSheetPrograms";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Program } from "@/data/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Mic, Moon, Heart, GraduationCap, Trophy, Swords, Mountain,
  Newspaper, Globe, Star, Sunrise, Database, Radio, Building, Podcast,
  MessageSquare, Camera, Palette, Award, Sparkles, Flame,
};

const statusConfig = {
  planning: { label: "Perencanaan", color: "bg-amber-500" },
  ongoing: { label: "Berjalan", color: "bg-primary" },
  completed: { label: "Selesai", color: "bg-emerald-500" },
};

/* DonutProgress removed per plan */

const divisionFilters = [
  { id: "all", label: "Semua" },
  ...divisions.map((d) => ({ id: d.id, label: d.name.replace("Bidang ", "").replace("Badan Pengurus Harian", "BPH") })),
];

export default function ProgramsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const isMobile = useIsMobile();
  const { programs, isLoading } = useGoogleSheetPrograms();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const filteredPrograms = activeFilter === "all"
    ? programs
    : programs.filter((p) => p.division === activeFilter);

  return (
    <section id="program" ref={containerRef} className="relative bg-background overflow-hidden">
      <motion.div
        className="absolute top-[20%] right-[-5%] w-[350px] h-[350px] rounded-full blur-3xl opacity-15"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]),
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
            Program Kerja
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-osis-navy mb-4">
            Program Kerja
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Program kerja yang dirancang dan dilaksanakan oleh OSIS SMA Al-Jannah
          </p>
        </motion.div>

        {/* Division Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {divisionFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white/60 text-muted-foreground border border-primary/10 hover:bg-primary/10 hover:text-primary"
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program, index) => {
                const Icon = iconMap[program.icon] || BookOpen;
                const division = divisions.find((d) => d.id === program.division);
                const status = statusConfig[program.status];

                return (
                  <motion.div
                    key={program.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "rounded-2xl bg-white/70 backdrop-blur-sm border border-primary/10 p-6 hover:-translate-y-1 transition-all duration-300 group",
                      program.photos && program.photos.length > 0 && "cursor-pointer hover:border-primary/30 hover:shadow-lg"
                    )}
                    onClick={() => {
                      if (program.photos && program.photos.length > 0) {
                        setSelectedProgram(program);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      {program.photos && program.photos.length > 0 && (
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{program.photos.length}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className={cn("w-2 h-2 rounded-full", status.color)} />
                      <span className="text-xs text-muted-foreground font-medium">{status.label}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-osis-navy mb-2 group-hover:text-primary transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{program.description}</p>

                    {division && (
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{division.name}</span>
                        {program.photos && program.photos.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary/60 group-hover:text-primary transition-colors">
                            Lihat Detail <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Tertarik bergabung dengan program kami?{" "}
            <a href="#kontak" className="text-primary font-medium hover:underline">Hubungi kami</a>
          </p>
        </motion.div>
      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        isMobile={isMobile}
        onClose={() => setSelectedProgram(null)}
      />
    </section>
  );
}

function ProgramDetailModal({
  program,
  isMobile,
  onClose,
}: {
  program: Program | null;
  isMobile: boolean;
  onClose: () => void;
}) {
  const open = !!program;
  const Icon = program ? iconMap[program.icon] || BookOpen : BookOpen;
  const status = program ? statusConfig[program.status] : statusConfig.planning;
  const division = program ? divisions.find((d) => d.id === program.division) : null;

  const content = program ? (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", status.color)} />
            <span className="text-xs text-muted-foreground font-medium">{status.label}</span>
          </div>
          {division && <span className="text-xs text-muted-foreground">{division.name}</span>}
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{program.description}</p>
      {program.photos && program.photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {program.photos.map((url, i) => (
            <img
              key={i}
              src={url.includes("googleusercontent") ? `${url}=w400` : url}
              alt={`${program.name} foto ${i + 1}`}
              loading="lazy"
              className="rounded-lg w-full aspect-[4/3] object-cover bg-muted"
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">Belum ada dokumentasi kegiatan</p>
      )}
    </div>
  ) : null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>{program?.name}</DrawerTitle>
            <DrawerDescription className="sr-only">Detail program kerja</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{program?.name}</DialogTitle>
          <DialogDescription className="sr-only">Detail program kerja</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}