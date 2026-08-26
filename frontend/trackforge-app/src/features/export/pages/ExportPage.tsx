import { useState } from "react";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { listIssues } from "@/features/issues/api/issues";

export function ExportPage() {
  const { notify } = useToast();
  const [format, setFormat] = useState<"CSV" | "JSON">("CSV");
  const [loading, setLoading] = useState(false);

  const exportData = async () => {
    setLoading(true);
    try {
      const issues = await listIssues("p-1");
      if (format === "CSV") {
        const header = "id,summary,status,priority";
        const rows = issues.map((i) => `${i.id},"${i.summary}",${i.statusName ?? ""},${i.priority ?? ""}`);
        const csv = [header, ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "trackforge-export.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const blob = new Blob([JSON.stringify(issues, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "trackforge-export.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      notify(`Exported ${issues.length} issues as ${format}`);
    } catch (err) {
      notify("Export failed", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Export</h1>
      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => setFormat("CSV")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 transition-all duration-150 ${format === "CSV" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}
          >
            <FileSpreadsheet className="h-5 w-5" /> CSV
          </button>
          <button
            onClick={() => setFormat("JSON")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 transition-all duration-150 ${format === "JSON" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}
          >
            <FileJson className="h-5 w-5" /> JSON
          </button>
        </div>
        <button
          onClick={exportData}
          disabled={loading}
          className="flex w-full items-center justify-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700 disabled:opacity-50"
        >
          <Download className="h-4 w-4" /> {loading ? "Exporting…" : `Export as ${format}`}
        </button>
      </div>
    </div>
  );
}
