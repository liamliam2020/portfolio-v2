import React, { Fragment } from "react";
import classes from "./Project.module.css";
import ProjectItem from "./ProjectItem/ProjectItem";

//TODO make a project markdown file and then just pull all thsi information from there instead much cleaner
const Project = () => (
  <Fragment>
    <div id="projects" />
    <ul className={classes.Main}>
      <hr />
      <li>
        <ProjectItem
          title="Sorting Algorithm Visualizer"
          desc="Visual implementation of Merge Sort, Bubble Sort, Quick Sort, and Shell Sort."
          tech="JavaScript (ES6), React.js, CSS, Git"
          route="https://github.com/liamliam2020/sorting-visualizer"
        />
        <hr />
      </li>
      <li>
        <ProjectItem
          title="Memory Allocator"
          desc="An implementation of Malloc and Free using a worst fit scheme."
          tech="C, Make"
          route="https://github.com/liamliam2020/MemoryAllocator/blob/master/mymalloc.c"
        />
        <hr />
      </li>
      <li>
        <ProjectItem
          title="Binary Search Tree Optimizer"
          desc="A top-down dynamic programming algorithm to find optimal binary search trees."
          tech="Java"
          route="https://github.com/liamliam2020/BSTOptimizer"
        />
        <hr />
      </li>
      <li>
        <ProjectItem
          title="Portfolio Website"
          desc="A single page portfolio website which you are currently viewing."
          tech="React.js, CSS, Git"
          route="/"
        />
        <hr />
      </li>
    </ul>
  </Fragment>
);

export default Project;
