// design note: try to keep pages lean and only handle what needs to happen with props here
// styling and all that should be done in the react components!

import Head from "next/head";
import { Fragment } from "react";

import Hero from "../components/Hero/Hero";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import Content from "../components/Main/Content";
import Footer from "../components/Navigation/Footer/Footer";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>B. Liam Rethore's Portfolio</title>
        <meta name="description" content="This is a placeholder for now"></meta>
      </Head>
      <Toolbar />
      <Hero />
      <Content />
      <Footer />
    </Fragment>
  );
}

export default HomePage;
