import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="section-container max-w-2xl">
      <h1 className="text-2xl font-heading font-bold mb-6">Create Project</h1>
      <ProjectForm />
    </div>
  );
}
