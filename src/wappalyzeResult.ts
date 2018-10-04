export interface WappalyzeResult
{
    urls : {
        [i : string] : {
            status : number;
        }
    };

    applications : Array<{
        name : string;
        confidence : string;
        version : string;
        icon : string;
        website : string;
        categories : Array<{[i : string] : string}>
    }>;

    meta : {
        language : string | null;
    }
}