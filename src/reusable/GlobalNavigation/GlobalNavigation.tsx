import React from "react";

import "./GlobalNavigation.scss";

interface GlobalNavigationProps {
  projectName?: string;
}

function GlobalNavigation({ projectName }: GlobalNavigationProps) {
  return (
    <div className="global-navigation">
      <h1>
        {/* TODO: 로고제작 */}
        <span>Logo</span>
        <span>
          rere / <strong>{projectName}</strong>
        </span>
      </h1>
    </div>
  );
}

export default GlobalNavigation;
