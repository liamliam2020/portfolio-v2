import Head from "next/head";
import { Fragment } from "react";

import Hero from "../components/Hero/Hero";
import Project from "../components/Projects/Project";
import { getAllProjects } from "../projects/project-content";

interface HomePageProps {
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string;
    route: string;
  }[];
}

function HomePage(props: HomePageProps) {
  //TODO optimzie for mobile
  //TODO new favicon!
  return (
    <Fragment>
      <Head>
        <title>B. Liam Rethore's Portfolio</title>
        <meta name="description" content="This is a placeholder for now"></meta>
      </Head>
      <Hero />
      <Project items={props.projects} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredProjects = await getAllProjects();
  //TODO tweak setting for reloads will be pretty infrequent if ever
  return {
    props: {
      projects: featuredProjects,
    },
    revalidate: 3600,
  };
}

export default HomePage;
