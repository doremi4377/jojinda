import React from "react";

import { Layout, GlobalNavigation } from "./reusable";
import MusicStore from "./components/MusicStore/MusicStore";

function App() {
  return (
    <div className="App">
      <GlobalNavigation projectName="PlayList" />
      <Layout>
        <MusicStore />
      </Layout>
    </div>
  );
}

export default App;
