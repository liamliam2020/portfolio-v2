import React, { Fragment } from "react";
import classes from "./Content.module.css";
import ContentItem from "./ContentItem/ContentItem";

const Content = () => (
  <Fragment>
    <div id="projects" />
    <ul className={classes.Main}>
      <hr />
      <li>
        <ContentItem
          title="Sorting Algorithm Visualizer"
          desc="Visual implementation of Merge Sort, Bubble Sort, Quick Sort, and Shell Sort."
          tech="JavaScript (ES6), React.js, CSS, Git"
          route="https://github.com/liamliam2020/sorting-visualizer"
        />
        <hr />
      </li>
      <li>
        <ContentItem
          title="Memory Allocator"
          desc="An implementation of Malloc and Free using a worst fit scheme."
          tech="C, Make"
          route="https://github.com/liamliam2020/MemoryAllocator/blob/master/mymalloc.c"
        />
        <hr />
      </li>
      <li>
        <ContentItem
          title="Binary Search Tree Optimizer"
          desc="A top-down dynamic programming algorithm to find optimal binary search trees."
          tech="Java"
          route="https://github.com/liamliam2020/BSTOptimizer"
        />
        <hr />
      </li>
      <li>
        <ContentItem
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

export default Content;
