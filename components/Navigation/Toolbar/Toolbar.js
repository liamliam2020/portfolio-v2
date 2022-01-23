import Link from "next/link";
import React from "react";
import classes from "./Toolbar.module.css";
//import resumePDF from '../../../assets/B Liam Rethore Resume.pdf';

const Toolbar = () => {
  return (
    <header className={classes.header}>
      <Link href="/">https://bliamrethore.com</Link>
      <nav>
        <ul>
          <li>
            <Link href="/resume">Resume</Link>
          </li>
          <li>
            <Link href="/info">Info</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Toolbar;
