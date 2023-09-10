import React from "react";

import SideNavigation from "../SideNavigation/SideNavigation";

import "./Layout.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <SideNavigation />
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;
