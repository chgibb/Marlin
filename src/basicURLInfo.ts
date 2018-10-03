export interface BasicURLInfo
{
    urls : Array<string>;
    responseHeaders : Record<string,string>;
    remoteAddress : {
        ip : string,
        port : number
    };
    screenShot : string;
    srcText : string;
}