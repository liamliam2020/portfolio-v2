import React from "react";
import classes from "./ProjectItem.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

interface ProjectItemProps {
  title: string;
  description: string;
  technologies: string;
  route: string;
}

function ProjectItem(props: ProjectItemProps) {
  const { title, description, technologies, route } = props;

  return (
    <li>
      <div className={classes.MainItem}>
        <Link href={route}>
          <ul>
            <li>
              <h2>{title}</h2>
              <p>{description}</p>
              <p>{technologies}</p>
            </li>
            <li>
              <ArrowForwardIcon fontSize="large" />
            </li>
          </ul>
        </Link>
      </div>
      <hr />
    </li>
  );
}

export default ProjectItem;
