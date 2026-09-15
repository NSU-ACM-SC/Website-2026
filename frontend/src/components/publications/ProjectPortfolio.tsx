import { projectPortfolio } from "@/data/publications";
import { ProjectCard } from "./cards/ProjectCard";

export function ProjectPortfolio() {
  return (
    <section className="project-showcase" aria-label="Project portfolio">
      <div className="project-list-heading">
        <span>Selected builds</span>
        <span>{projectPortfolio.length} projects</span>
      </div>
      <div className="project-list">
        {projectPortfolio.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
