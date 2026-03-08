import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Users, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { schoolInfo } from "@/data/osisData";
import { useGoogleSheetVisiMisi } from "@/hooks/useGoogleSheetVisiMisi";
import { useGoogleSheetMembers } from "@/hooks/useGoogleSheetMembers";
import { useGoogleSheetPrograms } from "@/hooks/useGoogleSheetPrograms";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { visions, missions, isLoading } = useGoogleSheetVisiMisi();
  const { members } = useGoogleSheetMembers();
  const { programs } = useGoogleSheetPrograms();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="tentang" ref={containerRef} className="relative bg-background overflow-hidden">
      <motion.div
        className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
          y: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]),
          background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
        }}
      />

      <div ref={sectionRef} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Tentang Kami
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-osis-navy mb-4">
            {schoolInfo.osisName}
          </h2>
        </motion.div>

        {/* Visi */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-bold text-lg text-osis-navy">Visi</h3>
          </div>
          {isLoading ? (
            <div className="pl-7 space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ) : (
            <div className="space-y-3 pl-7">
              {visions.map((vision, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-muted-foreground text-lg leading-relaxed"
                >
                  {vision}
                </motion.p>
              ))}
            </div>
          )}
        </motion.div>

        {/* Misi */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-bold text-lg text-osis-navy">Misi</h3>
          </div>
          {isLoading ? (
            <div className="pl-7 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          ) : (
            <ol className="space-y-3 pl-7">
              {missions.map((mission, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 15, filter: "blur(8px)" }}
                  animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
                  className="flex gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="font-heading font-bold text-primary/50 text-sm mt-0.5">{index + 1}.</span>
                  <span>{mission}</span>
                </motion.li>
              ))}
            </ol>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Users, title: "Pengurus Aktif", value: String(members.length), subtitle: "Orang" },
            { icon: Target, title: "Program Kerja", value: String(programs.length), subtitle: "Program" },
            { icon: MessageCircle, title: "Komunikatif", value: null, subtitle: "Terbuka & menghargai" },
            { icon: Users, title: "Kolaboratif", value: null, subtitle: "Harmonis & solid" },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              {item.value && (
                <div className="text-2xl font-heading font-bold text-osis-navy mb-0.5">{item.value}</div>
              )}
              <h4 className="font-heading font-bold text-sm text-osis-navy">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
