import * as fs from "fs";

import * as puppeteer from "puppeteer";
const Wappalyzer = require("wappalyzer");

interface WappalyzeResult
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

async function wappalyze(url : string) : Promise<WappalyzeResult>
{
    return new Promise<WappalyzeResult>(async (resolve : (value : WappalyzeResult) => void) => {
        const options = {
            debug: false,
            delay: 500,
            maxDepth: 3,
            maxUrls: 10,
            maxWait: 5000,
            recursive: true,
            userAgent: 'Wappalyzer',
            htmlMaxCols: 2000,
            htmlMaxRows: 2000,
          };
          const wappalyzer = new Wappalyzer(url,options);
          let json = await wappalyzer.analyze();
          return resolve(json);
    });
}

async function collectAllNetworkRequests(browser : puppeteer.Browser,url : string) : Promise<{
    page : puppeteer.Page,
    response : puppeteer.Response,
    urls : Array<string>}> {
    return new Promise<{page : puppeteer.Page,response : puppeteer.Response,urls : Array<string>}>(
        async (resolve : (val : {page : puppeteer.Page,response : puppeteer.Response,urls : Array<string>}) => void) => {
            let urls = new Array<string>();
            const page = await browser.newPage();
            

            page.on("request",(e : puppeteer.Request) => {
                urls.push(e.url());
            });

            const req = await page.goto(url,{waitUntil : "networkidle2"});

            setTimeout(() => {
                return resolve({page : page,response : req!,urls : urls});
            },200);          
            
    });
}

(async() => {
    const browser = await puppeteer.launch({ignoreHTTPSErrors : true});
    const {page,response,urls} = await collectAllNetworkRequests(browser,"https://www.wikipedia.com");

    console.log(urls);
    console.log(response!.headers());
    let redirects = response!.request().redirectChain();
    for(let i = 0; i != redirects.length; ++i)
    {
        console.log(redirects[i].url());
    }
    console.log((<any>response!).remoteAddress());
    let screen = await page.screenshot({
        type : "jpeg",
        quality : 100
    });

    let src = await response!.text();
    
    fs.writeFileSync("screen.jpg",screen);
    fs.writeFileSync("screen.html",src);
    
    await browser.close();

    wappalyze("https://www.wikipedia.com");
})().catch(err => {
    console.error(err);
});
