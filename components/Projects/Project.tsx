import React, { Fragment } from "react";
import classes from "./Project.module.css";
import ProjectItem from "./ProjectItem/ProjectItem";

interface ProjectProps {
  items: {
    id: string;
    title: string;
    description: string;
    technologies: string;
    route: string;
  }[];
}

function Project(props: ProjectProps) {
  const { items } = props;

  return (
    <Fragment>
      <div id="projects" />
      <ul className={classes.Main}>
        {items.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            route={project.route}
          />
        ))}
      </ul>
    </Fragment>
  );
}

export default Project;
