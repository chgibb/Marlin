import * as React from 'react';

import { Container, Header } from "gitstar-components";

import './App.css';

class App extends React.Component {
  public render() {
    return (
      <Container>
        <Header>
        <div style={{ display: "flex", alignItems: "center" }} />
        <a href={`https://github.com/chgibb`}>chgibb</a>
        </Header>
      </Container>
    );
  }
}

export default App;
