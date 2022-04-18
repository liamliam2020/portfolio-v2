import React from "react";
import styles from "./Hero.module.css";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Hero = () => (
  <div className={styles.Hero}>
    <h2>
      Hi, I'm Liam a backend software engineer at General Motors! Check out some of 
      what I've done.
    </h2>
    <div className={styles.icon}>
      <a href="/#projects">
        <ArrowDownwardIcon style={{ fontSize: 60 }} />
      </a>
    </div>
  </div>
);

export default Hero;
