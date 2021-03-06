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

const isURL = require("is-url");

export interface SearchBoxProps
{
    onSearchUpdated : (res : string) => void;
}

export class SearchBox extends React.Component<SearchBoxProps>
{
    public timer : NodeJS.Timer;
    public constructor(props : SearchBoxProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <div>
                <form onSubmit={this.searchUpdated}>
                    <input type="text" id="URLInput" placeholder="Enter a website URL" autoFocus={true} />
                    <button type="button" onClick={this.searchUpdated as any}>Analyze URL</button>
                </form>
            </div>
        );
    }

    private searchUpdated = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let url = (document.getElementById("URLInput") as HTMLInputElement).value;
        if(!isURL(url))
        {
            alert("Please enter a valid URL");
        }
        
        else
        {
            this.props.onSearchUpdated(url);
        }
    }
}