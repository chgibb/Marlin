import * as React from "react";

export interface RemoteAddressInfoProps
{
    remoteAddress : {
        ip : string,
        port : number
    };
}

export class RemoteAddressInfoState
{

}

export class RemoteAddressInfo extends React.Component<RemoteAddressInfoProps>
{
    public state : RemoteAddressInfoState = new RemoteAddressInfoState();
    public constructor(props : RemoteAddressInfoProps)
    {
        super(props);
    }

    public render()
    {
        return (
                <div>
                    <h2>{"IP: "+this.props.remoteAddress.ip}</h2>
                    <h2>{"Port: "+this.props.remoteAddress.port}</h2>
                </div>
        );
    }
}