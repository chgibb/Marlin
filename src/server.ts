import * as path from "path";

import * as puppeteer from "puppeteer";
import * as express from "express";
const bodyParser = require("body-parser");
const Wappalyzer = require("wappalyzer");

import { BasicURLInfo} from "./basicURLInfo";
import { RequestBasicURLInfoParams } from "./requestBasicURLInfo";
import { WappalyzeResult } from './wappalyzeResult';
import { RequestWappalyzeParams } from './requestWappalyze';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 5000;

app.get('/basicURLInfo', async(req, res) => {
  console.log(req.query);
  if (!req.query) {
    res.sendStatus(401);
    return;
  }
  try {
    let params = (<RequestBasicURLInfoParams>req.query);
    let responseBody: BasicURLInfo = <any>{};

    const browser = await puppeteer.launch({ignoreHTTPSErrors: true});
    const {page, response, urls} =
        await collectAllNetworkRequests(browser, params.url);

    responseBody.urls = urls;

    responseBody.remoteAddress = (<any>response).remoteAddress();

    let screen = await page.screenshot({type: "jpeg", quality: 100});

    responseBody.screenShot = screen.toString("base64");
    responseBody.srcText = await response.text();

    res.status(201);
    res.json(responseBody);
    await browser.close();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
    return;
  }

});

app.get('/wappalyze',async(req,res) => {
    console.log(req.query);
    if (!req.query) {
      res.sendStatus(401);
      return;
    }
    try {
        let params = (<RequestWappalyzeParams>req.query);
        let responseBody : WappalyzeResult = await wappalyze(params.url);
        res.status(201);
        res.json(responseBody);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
        return;
      }
});



app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => console.log(`Listening on port ${port}`));





async function wappalyze(url : string) : Promise<WappalyzeResult>
{
    return new Promise<WappalyzeResult>(async (resolve : (value :
WappalyzeResult) => void) => {
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

async function collectAllNetworkRequests(
    browser: puppeteer.Browser, url: string): Promise<{
  page: puppeteer.Page, response: puppeteer.Response, urls: Array<string>
}> {
  return new Promise<{
    page: puppeteer.Page,
    response: puppeteer.Response,
    urls: Array<string>
  }>(async(resolve: (val: {
             page: puppeteer.Page,
             response: puppeteer.Response,
             urls: Array<string>
           }) => void) => {
    let urls = new Array<string>();
    const page = await browser.newPage();


    page.on("request", (e: puppeteer.Request) => { urls.push(e.url()); });

    const req = await page.goto(url, {waitUntil: "networkidle2"});

    setTimeout(() => {
      return resolve({page: page, response: req !, urls: urls});
    }, 200);

  });
}
