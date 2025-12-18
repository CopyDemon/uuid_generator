import type { Request, Response } from "express";
import fs from "fs";
export const siteVisitorCountHandler = (req: Request, res: Response) => {
    console.log("siteVisitorCountHandler called");

    const visitorCountDocument = fs.readFileSync("visitorCount.json", "utf-8");
    let visitorCount = JSON.parse(visitorCountDocument)["visitorCount"];
    visitorCount += 1;
    fs.writeFileSync("visitorCount.json", JSON.stringify({ visitorCount }));

    res.send(`${visitorCount}`);
};