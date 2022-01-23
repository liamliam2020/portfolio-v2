import React, { Fragment } from "react";
import Footer from "./Footer/Footer";

import Navigation from "./Navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
