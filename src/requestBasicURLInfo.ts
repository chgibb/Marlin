import { BasicURLInfo } from "./basicURLInfo";

export interface RequestBasicURLInfoParams
{
    url : string;
}

export function requestBasicURLInfo(params : RequestBasicURLInfoParams) : Promise<BasicURLInfo>
{
    return new Promise<BasicURLInfo>((resolve : (value : BasicURLInfo) => void,reject : (reason : string) => void) => {
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        xhr.open("GET",`/basicURLInfo?url=${params.url}`);

        xhr.onreadystatechange = function(this : XMLHttpRequest,ev : Event){
            
            if(xhr.status == 401)
                return reject("/basicURLInfo 401")

            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201)
            {
                return resolve(JSON.parse(xhr.response) as BasicURLInfo);
            }
        };

        xhr.send();
    });
}