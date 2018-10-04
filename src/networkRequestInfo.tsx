import * as React from "react";

export interface NetworkRequestInfoProps
{
    urls : Array<string>;
}

export class NetworkRequestInfoState
{

}

export class NetworkRequestInfo extends React.Component<NetworkRequestInfoProps>
{
    public state : NetworkRequestInfoState = new NetworkRequestInfoState();
    public constructor(props : NetworkRequestInfoProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <div>
            {
                this.props.urls.map(item => {
                    return (
                        <div>
                            <a href={item}>{item}</a>
                            <br />
                        </div>
                    )
                })
            }
            </div>
        );
    }
}