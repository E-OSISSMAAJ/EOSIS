import { useState, useEffect } from "react";
import { OsisMember } from "@/data/types";
import { osisMembers } from "@/data/osisData";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1oZIWKm5z2xN1a3SJ3LwcVpVyAzjdtBmIOUGXqjvERqM/gviz/tq?tqx=out:csv";

const DIVISION_MAP: Record<string, string> = {
  bph: "bph",
  "divisi islam": "islam",
  "divisi alam": "alam",
  "divisi sains": "sains",
  "divisi humas": "humas",
  "divisi kreatif": "kreatif",
};

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
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
  if (!html) return "/placeholder.svg";
  // Match src="..." in img tags
  const match = html.match(/src=["']([^"']+)["']/i);
  if (match) return match[1];
  // Maybe it's just a plain URL
  if (html.startsWith("http")) return html;
  return "/placeholder.svg";
}

function mapDivision(raw: string): string {
  const key = raw.toLowerCase().trim();
  return DIVISION_MAP[key] || "bph";
}

export function useGoogleSheetMembers() {
  const [members, setMembers] = useState<OsisMember[]>(osisMembers);
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

        // Skip header row (line 0)
        const parsed: OsisMember[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseCsvLine(lines[i]);
          // Columns: Nama, Kelas, Jabatan, Divisi, About me, Foto
          const name = cols[0]?.replace(/^"|"$/g, "") || "";
          const kelas = cols[1]?.replace(/^"|"$/g, "") || "";
          const jabatan = cols[2]?.replace(/^"|"$/g, "") || "";
          const divisi = cols[3]?.replace(/^"|"$/g, "") || "";
          const aboutMe = cols[4]?.replace(/^"|"$/g, "") || "";
          const fotoHtml = cols[5]?.replace(/^"|"$/g, "") || "";

          if (!name) continue;

          parsed.push({
            id: i,
            name,
            position: jabatan,
            division: mapDivision(divisi),
            class: kelas,
            photo: extractImageUrl(fotoHtml),
            bio: aboutMe || undefined,
          });
        }

        if (!cancelled && parsed.length > 0) {
          setMembers(parsed);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          // Keep fallback static data
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { members, isLoading, error };
}
