import { WappalyzeResult } from './wappalyzeResult';

export interface RequestWappalyzeParams
{
    url : string;
}

export function requestWappalyze(params : RequestWappalyzeParams) : Promise<WappalyzeResult>
{
    return new Promise<WappalyzeResult>((resolve : (value : WappalyzeResult) => void,reject : (reason : string) => void) => {
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        xhr.open("GET",`/wappalyze?url=${params.url}`);

        xhr.onreadystatechange = function(this : XMLHttpRequest,ev : Event){
            
            if(xhr.status == 401)
                return reject("/wappalyze 401")

            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201)
            {
                console.log(xhr.response);
                return resolve(JSON.parse(xhr.response) as WappalyzeResult);
            }
        };

        xhr.send();
    });
}