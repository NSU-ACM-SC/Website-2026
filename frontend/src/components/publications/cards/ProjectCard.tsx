import { GithubIcon } from "@/components/ui/SocialIcons";
import type { ProjectItem } from "@/types";
import { ArrowUpRight, ExternalLink, GitFork, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const detailsHref = `/publications/projects/${project.id}`;

  return (
    <article className="project-card">
      <Link
        href={detailsHref}
        className="project-card-link"
        aria-label={`View ${project.title}`}
      />
      <div className="project-card-image">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <span>{project.category}</span>
        {project.featured && <strong>★ Flagship</strong>}
      </div>
      <div className="project-card-inner">
        <div className="project-card-stats">
          <span>
            <Star size={13} fill="currentColor" /> {project.stars ?? 0}
          </span>
          <span>
            <GitFork size={13} /> {project.forks ?? 0}
          </span>
        </div>
        <h2>{project.title}</h2>
        <p className="project-description">{project.description}</p>
        <div className="project-engineers">
          <strong>Engineers:</strong> {project.authors.join(" · ")}
        </div>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="project-github"
          >
            <GithubIcon className="project-github-icon" /> GitHub repository{" "}
            <ArrowUpRight size={12} />
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-demo"
            >
              Live demo <ExternalLink size={13} />
            </a>
          ) : (
            <span
              className="project-demo project-demo-disabled"
              aria-disabled="true"
            >
              Live demo coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
