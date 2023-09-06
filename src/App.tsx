import React from "react";

import { Container, GlobalNavigation } from "./reusable";
import MusicStore from "./components/MusicStore/MusicStore";

function App() {
  return (
    <div className="App">
      <GlobalNavigation projectName="PlayList" />
      <Container>
        <MusicStore />
      </Container>
    </div>
  );
}

export default App;
