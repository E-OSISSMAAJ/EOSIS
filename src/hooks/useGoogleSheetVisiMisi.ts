import { useState, useEffect } from "react";
import { schoolInfo } from "@/data/osisData";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1UCAQHB_eeVp1AZHJhTN7glijoglJTu9ecjqdaeFWGo8/gviz/tq?tqx=out:csv";

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

export function useGoogleSheetVisiMisi() {
  const [visions, setVisions] = useState<string[]>([schoolInfo.vision]);
  const [missions, setMissions] = useState<string[]>(schoolInfo.missions);
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

        const parsedVisions: string[] = [];
        const parsedMissions: string[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = parseCsvLine(lines[i]);
          // Columns: no, Visi, misi
          const visi = cols[1]?.replace(/^"|"$/g, "").trim() || "";
          const misi = cols[2]?.replace(/^"|"$/g, "").trim() || "";

          if (visi) parsedVisions.push(visi);
          if (misi) parsedMissions.push(misi);
        }

        if (!cancelled) {
          if (parsedVisions.length > 0) setVisions(parsedVisions);
          if (parsedMissions.length > 0) setMissions(parsedMissions);
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

  return { visions, missions, isLoading, error };
}
