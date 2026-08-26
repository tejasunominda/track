import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Paperclip, MessageSquare, Star, User, Calendar, Flag, Clock } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { Avatar } from "@/components/Avatar";
import { relativeTime } from "@/lib/date";
import { createSubTask, createWorkLog, deleteIssue, fetchIssue, getStar, linkIssue, listAttachments, listComments, listLinkedIssues, listSubTasks, listWatchers, listWorkLogs, postComment, starIssue, unstarIssue, unwatchIssue, updateIssue, uploadAttachment, watchIssue } from "@/features/issues/api/issues";
import { Attachment, Issue, IssueComment, WorkLog } from "@/features/issues/types/issue";

const priorityColor: Record<string, string> = {
  Highest: "bg-red-100 text-red-700 ring-red-200",
  High: "bg-orange-100 text-orange-700 ring-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Low: "bg-slate-100 text-slate-600 ring-slate-200",
  Lowest: "bg-slate-100 text-slate-500 ring-slate-200",
};

function PriorityBadge({ priority }: { priority: string | null }) {
  if (!priority) return null;
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${priorityColor[priority] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
      {priority}
    </span>
  );
}

export function IssueDetailPage() {
  const { issueId } = useParams<{ issueId: string }>();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [comments, setComments] = useState<IssueComment[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [watchers, setWatchers] = useState<{ count: number; isWatching: boolean }>({ count: 0, isWatching: false });
  const [starred, setStarred] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [logMinutes, setLogMinutes] = useState("");
  const [logDescription, setLogDescription] = useState("");
  const [subTasks, setSubTasks] = useState<Issue[]>([]);
  const [linkedIssues, setLinkedIssues] = useState<any[]>([]);
  const [subSummary, setSubSummary] = useState("");
  const [linkTargetId, setLinkTargetId] = useState("");
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!issueId) return;
    setLoading(true);
    try {
      const [i, c, a, w, watchers, star, subs, links] = await Promise.all([
        fetchIssue(issueId),
        listComments(issueId),
        listAttachments(issueId),
        listWorkLogs(issueId),
        listWatchers(issueId),
        getStar(issueId),
        listSubTasks(issueId),
        listLinkedIssues(issueId),
      ]);
      setIssue(i);
      setComments(c);
      setAttachments(a);
      setWorkLogs(w);
      setWatchers(watchers);
      setStarred(star.starred);
      setSubTasks(subs);
      setLinkedIssues(links);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [issueId]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueId || !commentBody.trim()) return;
    try {
      const comment = await postComment(issueId, commentBody);
      setCommentBody("");
      setComments((prev) => [...prev, { ...comment, authorName: comment.authorName ?? "You" }]);
      notify("Comment posted");
    } catch (err) {
      notify("Failed to post comment", "error");
      console.error(err);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !issueId) return;
    try {
      const a = await uploadAttachment(issueId, file);
      setAttachments((prev) => [...prev, a]);
      notify("Attachment uploaded");
    } catch (err) {
      notify("Upload failed", "error");
      console.error(err);
    }
  };

  const handleLogWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueId || !logMinutes) return;
    try {
      const minutes = Number(logMinutes);
      const log = await createWorkLog(issueId, minutes, logDescription || undefined);
      setWorkLogs((prev) => [...prev, log]);
      setLogMinutes("");
      setLogDescription("");
      notify(`Logged ${minutes}m`);
    } catch (err) {
      notify("Failed to log work", "error");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!issue || !window.confirm("Delete this issue?")) return;
    try {
      await deleteIssue(issue.id);
      notify("Issue deleted");
      navigate(`/projects/${issue.projectId}/issues`);
    } catch (err) {
      notify("Failed to delete", "error");
      console.error(err);
    }
  };

  const toggleWatch = async () => {
    if (!issue) return;
    try {
      if (watchers.isWatching) {
        await unwatchIssue(issue.id);
        setWatchers((w) => ({ count: w.count - 1, isWatching: false }));
        notify("Stopped watching");
      } else {
        await watchIssue(issue.id);
        setWatchers((w) => ({ count: w.count + 1, isWatching: true }));
        notify("Watching issue");
      }
    } catch (err) {
      notify("Watch action failed", "error");
      console.error(err);
    }
  };

  const toggleStar = async () => {
    if (!issue) return;
    try {
      if (starred) {
        await unstarIssue(issue.id);
        setStarred(false);
        notify("Unstarred");
      } else {
        await starIssue(issue.id);
        setStarred(true);
        notify("Starred");
      }
    } catch (err) {
      notify("Star action failed", "error");
      console.error(err);
    }
  };

  const handleCreateSubTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueId || !subSummary.trim()) return;
    try {
      const sub = await createSubTask(issueId, subSummary);
      setSubTasks((prev) => [...prev, sub]);
      setSubSummary("");
      notify("Sub-task created");
    } catch (err) {
      notify("Failed to create sub-task", "error");
      console.error(err);
    }
  };

  const handleLinkIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueId || !linkTargetId.trim()) return;
    try {
      const link = await linkIssue(issueId, linkTargetId);
      setLinkedIssues((prev) => [...prev, link]);
      setLinkTargetId("");
      notify("Issue linked");
    } catch (err) {
      notify("Failed to link issue", "error");
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading issue…</div>;
  if (!issue) return <div className="p-6 text-red-600">Issue not found.</div>;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">{issue.issueTypeName}</span>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">{issue.statusName}</span>
          <PriorityBadge priority={issue.priority} />
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">{issue.summary}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleWatch}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 ${watchers.isWatching ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              <Eye className="h-4 w-4" />
              {watchers.isWatching ? "Watching" : "Watch"} {watchers.count > 0 && `(${watchers.count})`}
            </button>
            <button
              onClick={toggleStar}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 ${starred ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              <Star className="h-4 w-4" fill={starred ? "currentColor" : "none"} />
              {starred ? "Starred" : "Star"}
            </button>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          Added <span className="font-medium text-slate-700">{relativeTime(issue.createdAt)}</span> by
          <Avatar id={issue.reporterId} size={5} />
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{issue.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              <MessageSquare className="h-4 w-4" />
              Comments
            </h2>
            <form onSubmit={handlePostComment} className="mb-4 flex gap-2">
              <input
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Add a comment…"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0">
                Post
              </button>
            </form>
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="rounded-lg bg-slate-50 p-3 transition-all duration-150 hover:bg-blue-50/30">
                  <div className="flex items-center gap-2">
                    <Avatar id={c.authorId} size={5} />
                    <div>
                      <div className="text-xs font-bold text-slate-600">{c.authorName ?? c.authorId}</div>
                      <div className="text-[10px] text-slate-400">{relativeTime(c.createdAt)}</div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-800">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              <Paperclip className="h-4 w-4" />
              Attachments
            </h2>
            <input ref={fileRef} type="file" onChange={handleFile} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              className="mb-3 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
            >
              Upload file
            </button>
            <ul className="space-y-2">
              {attachments.map((a) => (
                <li key={a.id} className="flex items-center justify-between rounded-lg border-b border-slate-100 p-2 text-sm transition-all duration-150 hover:bg-slate-50">
                  <span className="text-slate-700">{a.fileName}</span>
                  <a href={a.downloadUrl} className="text-sm font-semibold text-blue-600 hover:underline">Download</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              <Clock className="h-4 w-4" />
              Work logs
            </h2>
            <form onSubmit={handleLogWork} className="mb-4 grid gap-2 sm:grid-cols-3">
              <input
                type="number"
                min={1}
                value={logMinutes}
                onChange={(e) => setLogMinutes(e.target.value)}
                placeholder="Minutes"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input
                value={logDescription}
                onChange={(e) => setLogDescription(e.target.value)}
                placeholder="Description (optional)"
                className="sm:col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="sm:col-start-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
              >
                Log work
              </button>
            </form>
            <ul className="space-y-2">
              {workLogs.map((w) => (
                <li key={w.id} className="flex items-center justify-between rounded-lg border-b border-slate-100 p-2 text-sm transition-all duration-150 hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Avatar id={w.authorId} size={5} />
                    <div>
                      <div className="font-medium text-slate-800">{w.authorName ?? w.authorId} – {w.description ?? "Work logged"}</div>
                      <div className="text-[10px] text-slate-400">{relativeTime(w.createdAt)}</div>
                    </div>
                  </div>
                  <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{w.timeSpentMinutes}m</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Sub-tasks</h2>
            <form onSubmit={handleCreateSubTask} className="mb-4 flex gap-2">
              <input
                value={subSummary}
                onChange={(e) => setSubSummary(e.target.value)}
                placeholder="Add a sub-task…"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0">
                Add
              </button>
            </form>
            <ul className="space-y-2">
              {subTasks.map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded-lg border-b border-slate-100 p-2 text-sm transition-all duration-150 hover:bg-slate-50">
                  <span className="text-slate-700">{s.summary}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{s.statusName}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Linked issues</h2>
            <form onSubmit={handleLinkIssue} className="mb-4 flex gap-2">
              <input
                value={linkTargetId}
                onChange={(e) => setLinkTargetId(e.target.value)}
                placeholder="Issue ID (e.g. i-2)"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0">
                Link
              </button>
            </form>
            <ul className="space-y-2">
              {linkedIssues.map((l) => (
                <li key={l.id} className="flex items-center justify-between rounded-lg border-b border-slate-100 p-2 text-sm transition-all duration-150 hover:bg-slate-50">
                  <span className="text-slate-700">{l.toSummary}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{l.linkType}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">Details</h2>
          <dl className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500"><User className="h-3.5 w-3.5" /> Reporter</dt>
              <dd className="flex items-center gap-2 font-medium text-slate-700"><Avatar id={issue.reporterId} size={5} /> {issue.reporterId ?? "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500"><User className="h-3.5 w-3.5" /> Assignee</dt>
              <dd className="flex items-center gap-2">
                <Avatar id={issue.assigneeId} size={5} />
                <select
                  value={issue.assigneeId ?? ""}
                  onChange={async (e) => {
                    const assigneeId = e.target.value || null;
                    const updated = await updateIssue(issue.id, { assigneeId } as any);
                    setIssue(updated);
                    notify("Assignee updated");
                  }}
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="">Unassigned</option>
                  <option value="u-1">Alice</option>
                  <option value="u-2">Bob</option>
                  <option value="u-3">Charlie</option>
                </select>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500"><Flag className="h-3.5 w-3.5" /> Priority</dt>
              <dd>
                <select
                  value={issue.priority ?? ""}
                  onChange={async (e) => {
                    const priority = e.target.value || null;
                    const updated = await updateIssue(issue.id, { priority } as any);
                    setIssue(updated);
                    notify("Priority updated");
                  }}
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="">—</option>
                  <option value="Lowest">Lowest</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Highest">Highest</option>
                </select>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500"><Calendar className="h-3.5 w-3.5" /> Status</dt>
              <dd>
                <select
                  value={issue.statusName ?? ""}
                  onChange={async (e) => {
                    const statusMap: Record<string, { name: string; category: string }> = {
                      "To Do": { name: "To Do", category: "TODO" },
                      "In Progress": { name: "In Progress", category: "IN_PROGRESS" },
                      "Done": { name: "Done", category: "DONE" },
                    };
                    const choice = statusMap[e.target.value];
                    if (!choice) return;
                    const updated = await updateIssue(issue.id, { statusName: choice.name, statusCategory: choice.category } as any);
                    setIssue(updated);
                    notify("Status updated");
                  }}
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500"><Calendar className="h-3.5 w-3.5" /> Updated</dt>
              <dd className="font-medium text-slate-700">{relativeTime(issue.updatedAt)}</dd>
            </div>
          </dl>

          <button
            onClick={handleDelete}
            className="mt-6 w-full rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition-all duration-150 hover:-translate-y-0.5 hover:bg-rose-50"
          >
            Delete issue
          </button>
        </aside>
      </div>
    </div>
  );
}
