import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectList } from "../components/ProjectList";
import { CreateProjectModal } from "../components/CreateProjectModal";

export function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (params.get("create") === "true") {
      setShowCreate(true);
      params.delete("create");
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

  return (
    <>
      <ProjectList />
      <CreateProjectModal open={showCreate} onClose={() => setShowCreate(false)} />
    </>
  );
}
