import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIssue, listAttachments, listComments, postComment, uploadAttachment } from "@/features/issues/api/issues";
import { Attachment, Issue, IssueComment } from "@/features/issues/types/issue";

export function IssueDetailPage() {
  const { issueId } = useParams<{ issueId: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [comments, setComments] = useState<IssueComment[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!issueId) return;
    setLoading(true);
    try {
      const [i, c, a] = await Promise.all([
        fetchIssue(issueId),
        listComments(issueId),
        listAttachments(issueId),
      ]);
      setIssue(i);
      setComments(c);
      setAttachments(a);
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
      await postComment(issueId, commentBody);
      setCommentBody("");
      const c = await listComments(issueId);
      setComments(c);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !issueId) return;
    try {
      await uploadAttachment(issueId, file);
      const a = await listAttachments(issueId);
      setAttachments(a);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading issue…</div>;
  if (!issue) return <div className="p-6 text-red-600">Issue not found.</div>;

  return (
    <div className="p-6">
      <div className="mb-6 rounded border bg-white p-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="rounded bg-slate-200 px-2 py-1">{issue.issueTypeName}</span>
          <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">{issue.statusName}</span>
          <span>{issue.priority}</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold">{issue.summary}</h1>
        <p className="mt-4 text-slate-700 whitespace-pre-wrap">{issue.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded border bg-white p-4">
            <h2 className="mb-3 font-semibold">Comments</h2>
            <form onSubmit={handlePostComment} className="mb-4 flex gap-2">
              <input
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Add a comment…"
                className="flex-1 rounded border px-3 py-2"
              />
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Post</button>
            </form>
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="rounded bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">{c.authorName ?? c.authorId}</div>
                  <p className="mt-1 text-slate-800">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded border bg-white p-4">
            <h2 className="mb-3 font-semibold">Attachments</h2>
            <input ref={fileRef} type="file" onChange={handleFile} className="mb-3 hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              className="mb-3 rounded border px-3 py-1 text-sm"
            >
              Upload file
            </button>
            <ul className="space-y-2">
              {attachments.map((a) => (
                <li key={a.id} className="flex items-center justify-between rounded bg-slate-50 p-2 text-sm">
                  <span>{a.fileName}</span>
                  <a href={a.downloadUrl} className="text-blue-600 hover:underline">Download</a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="rounded border bg-white p-4">
          <h2 className="mb-3 font-semibold">Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Reporter</dt><dd>{issue.reporterId}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Assignee</dt><dd>{issue.assigneeId ?? "Unassigned"}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Story points</dt><dd>{issue.storyPoints ?? "—"}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
