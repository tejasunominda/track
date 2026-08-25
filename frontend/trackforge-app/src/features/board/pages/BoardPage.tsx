import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { fetchBoard, moveIssue } from "@/features/board/api/board";
import { BoardColumn, BoardIssue, BoardState } from "@/features/board/types/board";

const priorityColor: Record<string, string> = {
  Highest: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-slate-100 text-slate-600",
  Lowest: "bg-slate-100 text-slate-500",
};

function PriorityBadge({ priority }: { priority: string | null }) {
  if (!priority) return null;
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${priorityColor[priority] ?? "bg-slate-100 text-slate-600"}`}>
      {priority}
    </span>
  );
}

function TypeIcon({ type }: { type: string | null }) {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-100 text-[10px] font-bold text-blue-700">
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
      {...listeners}
      {...attributes}
      style={style}
      className={`group mb-2 cursor-grab rounded border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-blue-300 hover:shadow-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <TypeIcon type={issue.issueTypeName} />
        <PriorityBadge priority={issue.priority} />
      </div>
      <div className="text-sm font-medium leading-snug text-slate-800">{issue.summary}</div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">{issue.id.slice(0, 8)}</span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500">
          {issue.assigneeId ? issue.assigneeId.slice(0, 1).toUpperCase() : "—"}
        </div>
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
      className={`flex h-full min-h-[22rem] w-72 flex-col rounded bg-slate-100 p-2 ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700">{column.statusName}</span>
          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-xs font-semibold text-slate-600">
            {count}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

export function BoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [board, setBoard] = useState<BoardState | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<BoardIssue | null>(null);

  useEffect(() => {
    if (!projectId) return;
    fetchBoard(projectId)
      .then(setBoard)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

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
      const updated = { ...movedIssue, statusName: target.statusName };
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
    <div className="h-full bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{board.projectName}</h1>
          <p className="text-sm text-slate-500">Board</p>
        </div>
      </div>
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
