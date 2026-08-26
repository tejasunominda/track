import { useRef, useState } from "react";
import { FileUp, Upload } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ImportPage() {
  const { notify } = useToast();
  const [format, setFormat] = useState("CSV");
  const [preview, setPreview] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      setPreview(text.split("\n").slice(0, 5));
      notify(`Preview ready for ${file.name}`);
    };
    reader.readAsText(file);
  };

  const importData = () => {
    if (preview.length === 0) {
      notify("No file selected", "error");
      return;
    }
    notify(`Imported from ${format}`);
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Import</h1>
      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none">
            <option value="CSV">CSV</option>
            <option value="JSON">JSON</option>
            <option value="Jira">Jira XML</option>
          </select>
        </div>
        <div
          onClick={() => fileRef.current?.click()}
          className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 text-slate-500 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/30"
        >
          <Upload className="mb-2 h-8 w-8" />
          <div className="text-sm font-medium">Click to upload a {format} file</div>
        </div>
        <input ref={fileRef} type="file" accept=".csv,.json,.xml" className="hidden" onChange={handleFile} />
        {preview.length > 0 && (
          <div className="mb-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <div className="mb-1 font-bold">Preview ({preview.length} lines):</div>
            {preview.map((line, i) => <div key={i} className="truncate">{line}</div>)}
          </div>
        )}
        <button onClick={importData} className="flex w-full items-center justify-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <FileUp className="h-4 w-4" /> Import {format}
        </button>
      </div>
    </div>
  );
}
