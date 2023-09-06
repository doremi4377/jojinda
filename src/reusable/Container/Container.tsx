import React from "react";

import "./Container.scss";
import SideNavigation from "../SideNavigation/SideNavigation";

interface ContainerProps {
  children?: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="container">
      <SideNavigation />
      <div className="content">{children}</div>
    </div>
  );
}

export default Container;
