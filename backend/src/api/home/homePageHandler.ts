import type { Request, Response } from "express";
export const homePageHandler = (req: Request, res: Response) => {
    res.send("welcome to mybittools.com");
};