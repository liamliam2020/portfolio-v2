import React from "react";
import classes from "./ContentItem.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ContentItem = (props) => (
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

export default ContentItem;
