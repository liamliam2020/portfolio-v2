import Link from "next/link";
import React from "react";
import classes from "./Navigation.module.css";
//import resumePDF from '../../../public/static/B_Liam_Rethore_Resume_2022.pdf';

const Navigation = () => {
  return (
    <header className={classes.header}>
      <Link href="/">https://bliamrethore.com</Link>
      <nav>
        <ul>
          <li>
            <Link href="/#info">Info</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
