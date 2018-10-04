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