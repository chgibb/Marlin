import * as React from 'react';

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
                <input type="text" placeholder="Enter a website URL" autoFocus={true} onFocus={this.searchUpdated} onChange={this.searchUpdated} />
            </div>
        );
    }

    private searchUpdated = async (event : React.ChangeEvent<HTMLInputElement>) => {
        event.persist();

        if(this.timer)
        {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(async () => {
            this.props.onSearchUpdated(event.target.value);
        },500);
    }
}