import * as React from "react";

import Paper from '@material-ui/core/Paper';

/*const styles = {
    root: {
      flexGrow: 1,
      maxWidth: 600,
      padding: 20 * 2,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  };*/

export interface NetworkRequestInfoProps
{

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
            <Paper className="paper">super big long name</Paper>
        );
    }
}