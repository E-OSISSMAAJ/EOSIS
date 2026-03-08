import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Crown, Settings, Moon, Mountain, Cpu, Palette, Users, Instagram,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useGoogleSheetMembers } from "@/hooks/useGoogleSheetMembers";
import { divisions } from "@/data/osisData";
import { OsisMember } from "@/data/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown, Settings, Moon, Mountain, Cpu, Palette, Users,
};

export default function TeamSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { members, isLoading } = useGoogleSheetMembers();
  const [activeTab, setActiveTab] = useState("bph");
  const [selectedMember, setSelectedMember] = useState<OsisMember | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineX = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  const filteredMembers = members.filter((m) => m.division === activeTab);
  const activeDivision = divisions.find((d) => d.id === activeTab);

  return (
    <section id="struktur" ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Parallax diagonal lines */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ x: lineX }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] bg-primary/5 rotate-[35deg]"
            style={{
              top: `${15 + i * 15}%`,
              left: "-20%",
              width: "140%",
            }}
          />
        ))}
      </motion.div>

      <div ref={sectionRef} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Struktur Organisasi
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-osis-navy mb-2">
            Pengurus OSIS
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tim yang berdedikasi untuk memajukan kegiatan siswa
          </p>
        </motion.div>

        {/* Layout: Sidebar + Carousel */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Division Selector - Vertical sidebar on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-56 flex-shrink-0"
          >
            {/* Mobile: horizontal scroll */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto scrollbar-hide lg:overflow-visible pb-2 lg:pb-0">
              {divisions.map((division) => {
                const Icon = iconMap[division.icon] || Users;
                const isActive = activeTab === division.id;
                return (
                  <button
                    key={division.id}
                    onClick={() => setActiveTab(division.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap lg:w-full text-left",
                      isActive
                        ? "bg-osis-navy text-white shadow-md"
                        : "bg-white/60 text-muted-foreground hover:text-foreground hover:bg-white border border-primary/10"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{division.name.split(" ").pop()}</span>
                  </button>
                );
              })}
            </div>

            {/* Division description on desktop */}
            <AnimatePresence mode="wait">
              {activeDivision && (
                <motion.div
                  key={activeDivision.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden lg:block mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <h4 className="font-heading font-bold text-sm text-osis-navy mb-1">{activeDivision.name}</h4>
                  <p className="text-muted-foreground text-xs">{activeDivision.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Members Grid Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-muted-foreground lg:hidden"
                >
                  {activeDivision?.name} — {filteredMembers.length} anggota
                </motion.p>
              </AnimatePresence>
              <div className="hidden lg:block text-sm text-muted-foreground">{filteredMembers.length} anggota</div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="w-28 h-28 mx-auto rounded-full mb-3" />
                    <Skeleton className="h-4 w-24 mx-auto mb-1" />
                    <Skeleton className="h-3 w-16 mx-auto mb-1" />
                    <Skeleton className="h-3 w-12 mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                  >
                    {filteredMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => setSelectedMember(member)}
                        className="cursor-pointer group"
                      >
                        <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-primary/10 mb-3 group-hover:border-primary/40 transition-colors">
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-xs font-medium bg-osis-navy/80 px-3 py-1 rounded-full">Detail</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-heading font-bold text-sm text-osis-navy group-hover:text-primary transition-colors line-clamp-1">{member.name}</h4>
                          <p className="text-primary text-xs font-medium">{member.position}</p>
                          <p className="text-muted-foreground text-xs">{member.class}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">Belum ada data pengurus untuk divisi ini</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <MemberModal member={selectedMember} isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} />
    </section>
  );
}

function MemberModal({ member, isOpen, onClose }: { member: OsisMember | null; isOpen: boolean; onClose: () => void }) {
  if (!member) return null;
  const division = divisions.find((d) => d.id === member.division);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="sr-only">{member.name}</DialogTitle></DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-muted">
            <img src={member.photo} alt={member.name} className="w-full h-64 md:h-full object-cover" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-2xl text-osis-navy">{member.name}</h3>
              <p className="text-primary font-semibold">{member.position}</p>
              <p className="text-muted-foreground text-sm">{member.class}</p>
            </div>
            {division && <Badge variant="secondary">{division.name}</Badge>}
            {member.bio && <div><h4 className="font-semibold text-sm text-foreground mb-1">Bio</h4><p className="text-muted-foreground text-sm">{member.bio}</p></div>}
            {member.skills && member.skills.length > 0 && (
              <div><h4 className="font-semibold text-sm text-foreground mb-2">Skills</h4><div className="flex flex-wrap gap-2">{member.skills.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}</div></div>
            )}
            {member.achievements && member.achievements.length > 0 && (
              <div><h4 className="font-semibold text-sm text-foreground mb-2">Prestasi</h4><ul className="space-y-1">{member.achievements.map((a, i) => <li key={i} className="text-muted-foreground text-sm flex items-start gap-2"><span className="text-primary">•</span>{a}</li>)}</ul></div>
            )}
            {member.socialLinks?.instagram && (
              <div className="flex gap-3 pt-2">
                <a href={`https://instagram.com/${member.socialLinks.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
