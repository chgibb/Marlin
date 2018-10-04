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