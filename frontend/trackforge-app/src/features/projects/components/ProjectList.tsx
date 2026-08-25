import { useQuery } from "@tanstack/react-query";
import { listProjects } from "../api/projects";

export function ProjectList() {
  const { data, isLoading } = useQuery({ queryKey: ["projects"], queryFn: listProjects });

  if (isLoading) return <p className="p-6 text-sm text-gray-500">Loading projects...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Projects</h1>
      {data?.length === 0 ? (
        <p className="text-sm text-gray-500">No projects yet.</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((p) => (
            <li key={p.id} className="rounded border border-gray-200 bg-white p-3">
              <div className="font-medium">
                {p.projectKey}: {p.name}
              </div>
              <div className="text-xs text-gray-500">{p.template}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
