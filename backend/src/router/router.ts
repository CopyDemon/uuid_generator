import { Router } from "express";
import type { Request, Response } from "express";
// import routes handlers
import { homePageHandler } from "@/api/home/homePageHandler";
import { siteVisitorCountHandler } from "@/api/siteVisitorCount/siteVisitorCountHandler";

const router = Router();
// routes
router.get("/", homePageHandler);
router.get("/siteVisitorCount", siteVisitorCountHandler);

export default router;