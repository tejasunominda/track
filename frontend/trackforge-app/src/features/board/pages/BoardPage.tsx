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
      className={`rounded border border-slate-200 bg-white p-3 shadow-sm ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="text-sm font-medium text-slate-900">{issue.summary}</div>
      <div className="mt-1 text-xs text-slate-500">{issue.statusName}</div>
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
  return (
    <div
      ref={setNodeRef}
      className={`flex h-full min-h-[20rem] w-72 flex-col rounded bg-slate-100 p-3 ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">{column.statusName}</h3>
        <span className="text-xs text-slate-500">{column.issues.length}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">{children}</div>
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
    const newStatusId = targetColumn?.statusId ?? overIssue?.statusName
      ? board.columns.find((c) => c.statusName === overIssue?.statusName)?.statusId
      : undefined;
    if (!newStatusId) return;

    const afterIssueId = overIssue?.id;

    // Optimistic local update
    const movedIssue = board.columns
      .flatMap((c) => c.issues)
      .find((i) => i.id === activeId);
    if (!movedIssue) return;

    const newColumns = board.columns.map((c) => ({
      ...c,
      issues: c.issues.filter((i) => i.id !== activeId).filter((i) => i.id !== afterIssueId),
    }));
    const updatedIssue = { ...movedIssue, statusName: board.columns.find((c) => c.statusId === newStatusId)?.statusName ?? movedIssue.statusName };

    const targetCol = newColumns.find((c) => c.statusId === newStatusId);
    if (targetCol) {
      const index = targetCol.issues.findIndex((i) => i.id === afterIssueId);
      if (index >= 0) {
        targetCol.issues.splice(index + 1, 0, updatedIssue);
      } else {
        targetCol.issues.push(updatedIssue);
      }
    }
    setBoard({ ...board, columns: newColumns });

    try {
      await moveIssue(activeId, newStatusId, afterIssueId);
    } catch (err) {
      console.error("Failed to move issue", err);
      // Revert by refetching
      fetchBoard(projectId).then(setBoard);
    }
  };

  if (loading) return <div className="p-6">Loading board…</div>;
  if (!board) return <div className="p-6 text-red-600">Could not load board.</div>;

  return (
    <div className="h-full p-6">
      <h1 className="mb-4 text-2xl font-bold">{board.projectName} Board</h1>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex h-full gap-4 overflow-x-auto">
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
