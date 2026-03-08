import { useState, useEffect } from "react";
import { Program } from "@/data/types";
import { programs as staticPrograms } from "@/data/osisData";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1VGrlOgmGd1G2lKCkqk-0ExaAlT9OTptkwy_SYNDO02I/gviz/tq?tqx=out:csv";

const DIVISION_MAP: Record<string, string> = {
  "divisi islam": "islam",
  "divisi alam": "alam",
  "divisi sains": "sains",
  "divisi humas": "humas",
  "divisi kreatif": "kreatif",
  bph: "bph",
};

const STATUS_MAP: Record<string, "planning" | "ongoing" | "completed"> = {
  berjalan: "ongoing",
  perencanaan: "planning",
  selesai: "completed",
};

const DIVISION_ICONS: Record<string, string> = {
  islam: "Moon",
  alam: "Mountain",
  sains: "GraduationCap",
  humas: "Globe",
  kreatif: "Palette",
  bph: "Building",
};

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function extractImageUrl(html: string): string {
  if (!html) return "";
  const match = html.match(/src=["']([^"']+)["']/i);
  if (match) return match[1];
  if (html.startsWith("http")) return html;
  return "";
}

export function useGoogleSheetPrograms() {
  const [programs, setPrograms] = useState<Program[]>(staticPrograms);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(SHEET_CSV_URL);
        if (!res.ok) throw new Error("Failed to fetch spreadsheet");
        const text = await res.text();
        const lines = text.split("\n").filter((l) => l.trim());
        if (lines.length < 2) throw new Error("Spreadsheet is empty");

        const parsed: Program[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseCsvLine(lines[i]);
          // Columns: Divisi, Nama Proker, Keterangan, Status Proker, Foto 1-5
          const divisiRaw = cols[0]?.replace(/^"|"$/g, "") || "";
          const name = cols[1]?.replace(/^"|"$/g, "") || "";
          const description = cols[2]?.replace(/^"|"$/g, "") || "";
          const statusRaw = cols[3]?.replace(/^"|"$/g, "") || "";

          if (!name) continue;

          const divisionKey = divisiRaw.toLowerCase().trim();
          const division = DIVISION_MAP[divisionKey] || "bph";
          const status = STATUS_MAP[statusRaw.toLowerCase().trim()] || "planning";

          const photos: string[] = [];
          for (let j = 4; j <= 8; j++) {
            const url = extractImageUrl(cols[j]?.replace(/^"|"$/g, "") || "");
            if (url) photos.push(url);
          }

          parsed.push({
            id: i,
            name,
            description,
            division,
            status,
            progress: 0,
            icon: DIVISION_ICONS[division] || "BookOpen",
            photos: photos.length > 0 ? photos : undefined,
          });
        }

        if (!cancelled && parsed.length > 0) {
          setPrograms(parsed);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { programs, isLoading, error };
}
