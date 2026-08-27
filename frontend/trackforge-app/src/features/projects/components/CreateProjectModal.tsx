import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, FolderPlus, Loader2 } from "lucide-react";
import { createProject, type CreateProjectRequest } from "@/features/projects/api/projects";
import { useToast } from "@/app/ToastProvider";

const templates = [
  { value: "SCRUM", label: "Scrum", desc: "Sprints, backlog, boards" },
  { value: "KANBAN", label: "Kanban", desc: "Continuous flow, no sprints" },
  { value: "BUSINESS", label: "Business", desc: "Task management for teams" },
] as const;

export function CreateProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notify } = useToast();
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState<CreateProjectRequest["template"]>("SCRUM");

  const mutation = useMutation({
    mutationFn: (req: CreateProjectRequest) => createProject(req),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      notify("Project created successfully");
      reset();
      onClose();
    },
    onError: (err) => {
      notify(`Failed: ${err.message}`);
    },
  });

  const reset = () => {
    setName("");
    setProjectKey("");
    setDescription("");
    setTemplate("SCRUM");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !projectKey.trim()) return;
    mutation.mutate({ name: name.trim(), projectKey: projectKey.trim().toUpperCase(), description: description.trim(), template });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-popIn">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
              <FolderPlus className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Create project</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Project name <span className="text-red-500">*</span></label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!projectKey || projectKey.length < 3) {
                  setProjectKey(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6));
                }
              }}
              placeholder="e.g. Mobile App"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm shadow-sm outline-none transition-all duration-150 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Project key <span className="text-red-500">*</span></label>
            <input
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
              placeholder="e.g. MOB"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-mono font-semibold uppercase shadow-sm outline-none transition-all duration-150 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
            />
            <p className="mt-1 text-xs text-slate-500">Used as a prefix for issue keys (e.g. {projectKey || "MOB"}-1)</p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm shadow-sm outline-none transition-all duration-150 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Template</label>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTemplate(t.value)}
                  className={`rounded-lg border p-3 text-left transition-all duration-150 ${
                    template === t.value
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900">{t.label}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !projectKey.trim() || mutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {mutation.isPending ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
