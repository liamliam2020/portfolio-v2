import Head from "next/head";
import { Fragment } from "react";

import Hero from "../components/Hero/Hero";
import Toolbar from "../components/Layout/Navigation/Navigation";
import Project from "../components/Projects/Project";
import Footer from "../components/Layout/Footer/Footer";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>B. Liam Rethore's Portfolio</title>
        <meta name="description" content="This is a placeholder for now"></meta>
      </Head>
      <Hero />
      <Project />
    </Fragment>
  );
}

export default HomePage;
