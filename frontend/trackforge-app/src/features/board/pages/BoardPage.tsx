import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Avatar } from "@/components/Avatar";
import { fetchBoard, moveIssue } from "@/features/board/api/board";
import { BoardColumn, BoardIssue, BoardState } from "@/features/board/types/board";
import { CreateIssueModal } from "@/features/issues/components/CreateIssueModal";

const priorityColor: Record<string, string> = {
  Highest: "bg-red-100 text-red-700 ring-red-200",
  High: "bg-orange-100 text-orange-700 ring-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Low: "bg-slate-100 text-slate-600 ring-slate-200",
  Lowest: "bg-slate-100 text-slate-500 ring-slate-200",
};

const categoryBorder: Record<string, string> = {
  TODO: "border-l-slate-400",
  IN_PROGRESS: "border-l-blue-500",
  DONE: "border-l-green-500",
};

function PriorityBadge({ priority }: { priority: string | null }) {
  if (!priority) return null;
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${priorityColor[priority] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
      {priority}
    </span>
  );
}

function TypeIcon({ type }: { type: string | null }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
      {type ? type[0].toUpperCase() : "?"}
    </span>
  );
}

function IssueCard({ issue }: { issue: BoardIssue }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
    data: { issue },
  });
  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <div
      ref={setNodeRef}
      data-testid={`issue-card-${issue.id}`}
      {...listeners}
      {...attributes}
      style={style}
      className={`group mb-3 cursor-grab rounded-lg border border-slate-200 border-l-4 ${categoryBorder[issue.statusCategory ?? "TODO"]} bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg ${
        isDragging ? "opacity-40 rotate-2" : ""
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <TypeIcon type={issue.issueTypeName} />
        <PriorityBadge priority={issue.priority} />
      </div>
      <div className="text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-blue-800">
        {issue.summary}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">{issue.id.slice(0, 8)}</span>
        <Avatar id={issue.assigneeId} size={6} />
      </div>
    </div>
  );
}

function Column({
  column,
  children,
}: {
  column: BoardColumn;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.statusId, data: { column } });
  const count = column.issues.length;
  return (
    <div
      ref={setNodeRef}
      data-testid={`column-${column.statusId}`}
      className={`flex h-full min-h-[22rem] w-72 flex-col rounded-xl border border-slate-200 bg-slate-50 p-2 transition-all duration-200 ${
        isOver ? "ring-2 ring-blue-400 bg-blue-50/50" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">{column.statusName}</span>
          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">
            {count}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-1">{children}</div>
    </div>
  );
}

export function BoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [board, setBoard] = useState<BoardState | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<BoardIssue | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const loadBoard = () => {
    if (!projectId) return;
    setLoading(true);
    fetchBoard(projectId)
      .then(setBoard)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBoard();
  }, [projectId, refresh]);

  const handleDragStart = (e: DragStartEvent) => {
    const issue = e.active.data.current?.issue as BoardIssue | undefined;
    if (issue) setActive(issue);
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    setActive(null);
    if (!board || !projectId) return;

    const activeId = e.active.id as string;
    const over = e.over;
    if (!over) return;

    const overId = over.id as string;
    const targetColumn = board.columns.find((c) => c.statusId === overId);
    const overIssue = !targetColumn
      ? board.columns.flatMap((c) => c.issues).find((i) => i.id === overId)
      : undefined;
    const newStatusId = targetColumn?.statusId ??
      (overIssue ? board.columns.find((c) => c.issues.some((i) => i.id === overIssue.id))?.statusId : undefined);
    if (!newStatusId) return;

    const afterIssueId = overIssue?.id;

    const movedIssue = board.columns.flatMap((c) => c.issues).find((i) => i.id === activeId);
    if (!movedIssue) return;

    const nextBoard = board.columns.map((c) => ({
      ...c,
      issues: c.issues.filter((i) => i.id !== activeId),
    }));
    const target = nextBoard.find((c) => c.statusId === newStatusId);
    if (target) {
      const updated = { ...movedIssue, statusName: target.statusName, statusCategory: target.statusCategory };
      if (afterIssueId) {
        const idx = target.issues.findIndex((i) => i.id === afterIssueId);
        target.issues.splice(idx + 1, 0, updated);
      } else {
        target.issues.push(updated);
      }
    }
    setBoard({ ...board, columns: nextBoard });

    try {
      await moveIssue(activeId, newStatusId, afterIssueId);
    } catch (err) {
      console.error("Failed to move issue", err);
      fetchBoard(projectId).then(setBoard);
    }
  };

  if (loading) return <div className="p-6">Loading board…</div>;
  if (!board) return <div className="p-6 text-red-600">Could not load board.</div>;

  return (
    <div className="h-full bg-slate-50 p-4 animate-fadeIn">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{board.projectName}</h1>
          <p className="text-sm text-slate-500">Board</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
        >
          <Plus className="h-4 w-4" />
          Create issue
        </button>
      </div>

      {showModal && projectId && (
        <CreateIssueModal
          projectId={projectId}
          onClose={() => setShowModal(false)}
          onCreated={() => setRefresh((r) => !r)}
        />
      )}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex h-[calc(100%-4rem)] gap-3 overflow-x-auto pb-2">
          {board.columns.map((column) => (
            <Column key={column.statusId} column={column}>
              {column.issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </Column>
          ))}
        </div>
        <DragOverlay>{active ? <IssueCard issue={active} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}
