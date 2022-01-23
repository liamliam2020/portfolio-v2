import React from "react";
import styles from "./Hero.module.css";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Hero = () => (
  <div className={styles.Hero}>
    <h2>
      Hi! I'm Liam a software engineer looking for new work. Check out some of
      what I've done below. (Change Me)
    </h2>
    <div className={styles.icon}>
      <a href="/#projects">
        <ArrowDownwardIcon style={{ fontSize: 60 }} />
      </a>
    </div>
  </div>
);

export default Hero;
