/*
MIT License

Copyright (c) 2018 Chris Gibb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as React from 'react';

import { Container, Header } from "gitstar-components";
import Grid from '@material-ui/core/Grid';

import { SearchBox } from "./searchBox";
import { NetworkRequestInfo } from "./networkRequestInfo";
import { RemoteAddressInfo } from "./remoteAddressInfo";
import { requestBasicURLInfo } from "./requestBasicURLInfo";
import { BasicURLInfo } from './basicURLInfo';
import { requestWappalyze } from './requestWappalyze';
import { WappalyzeResult } from './wappalyzeResult';
import './App.css';

class AppState
{
  public basicURLInfo : BasicURLInfo | undefined = undefined;
  public wappalyzeResult : WappalyzeResult | undefined = undefined;
  public analyzedURL : string | undefined = undefined;
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
                        this.state.analyzedURL && !this.state.basicURLInfo ?
                        <h1>Analyzing {this.state.analyzedURL}</h1> : ""
                    }
                    {
                        this.state.analyzedURL && this.state.basicURLInfo ? 
                        <h1>{this.state.analyzedURL}</h1> : ""
                    }
                    {
                        this.state.basicURLInfo && this.state.basicURLInfo.remoteAddress ?
                        <RemoteAddressInfo remoteAddress={this.state.basicURLInfo.remoteAddress} /> : ""
                    }
                    {
                        this.state.basicURLInfo && this.state.basicURLInfo.screenShot ? 
                        <img src={"data:image/png;base64, "+this.state.basicURLInfo.screenShot} /> : ""
                    }
                    {
                        this.state.basicURLInfo && this.state.basicURLInfo.screenShot && this.state.wappalyzeResult === undefined ?
                        <p>Still analyzing</p> : ""
                    }
                    <div>{
                        this.state.wappalyzeResult && this.state.wappalyzeResult.applications ?
                        <div><p>Built With:</p><br />{(this.state.wappalyzeResult!.applications.map(item => {
                            if(!/\.svg/g.test(item.icon))
                            {
                                return (
                                    <a href={item.website} target="_blank"><img key={item.icon} src={"https://github.com/AliasIO/Wappalyzer/raw/master/src/icons/"+item.icon}/></a>
                                )
                            }
                            else
                                return undefined;
                        }))}</div> : ""

                    }</div>
                    {
                        this.state.basicURLInfo && this.state.basicURLInfo.urls && this.state.basicURLInfo.urls.length > 0 ?
                        <div><p>Network Requests:</p><br />{(<NetworkRequestInfo urls={this.state.basicURLInfo.urls} />)}</div> : ""
                    }
                  </Grid>
                </Grid>
              </div>
          </Container>
         );
    }

    public onSearchUpdated = async (text : string) => {
        console.log(text);
        this.setState({analyzedURL : text,basicURLInfo : undefined,wappalyzeResult : undefined});
        setTimeout(async () => {
            let basicInfo = await requestBasicURLInfo({url : text});
            this.setState({analyzedURL : text,basicURLInfo : basicInfo});
            setTimeout(async () => {
                let wappalyzeResult = await requestWappalyze({url : text});
                console.log(wappalyzeResult);
                this.setState({wappalyzeResult : wappalyzeResult});
            },50);
        },50);
    }
}

export default App;
