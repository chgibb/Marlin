import * as React from 'react';

import { Container, Header } from "gitstar-components";
import Grid from '@material-ui/core/Grid';

import { SearchBox } from "./searchBox";
import { NetworkRequestInfo } from "./networkRequestInfo";
import { requestBasicURLInfo } from "./requestBasicURLInfo";
import './App.css';

class AppState
{
  public networkRequests : Array<string> | undefined;
}

class App extends React.Component {
  public state : AppState = new AppState();
  public render() {
    return (
      <Container>
        <Header>
        <div style={{ display: "flex", alignItems: "center" }} />
        <SearchBox onSearchUpdated={this.onSearchUpdated} />
        <a href={`https://github.com/chgibb`}>chgibb</a>
        </Header>
        <div className="root">
          <Grid container spacing={24}>
            <Grid item xs>
            {
              this.state.networkRequests && this.state.networkRequests.length > 0 ? (<NetworkRequestInfo />) : ""
            }
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }

  public onSearchUpdated = (text : string) => {
    console.log(text);
    requestBasicURLInfo({url : text});
  }
}

export default App;
