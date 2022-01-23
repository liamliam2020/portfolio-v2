import React from "react";
import classes from "./ProjectItem.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ProjectItemProps {
  route: string;
  title: string;
  desc: string;
  tech: string;
}
//TODO maybe this elemt should be a li and save me some styling in the future 

const ProjectItem = (props: ProjectItemProps) => (
  <div className={classes.MainItem}>
    <a href={props.route}>
      <ul>
        <li>
          <h2>{props.title}</h2>
          <p>{props.desc}</p>
          <p>{props.tech}</p>
        </li>
        <li>
          <ArrowForwardIcon fontSize="large" />
        </li>
      </ul>
    </a>
  </div>
);

export default ProjectItem;
