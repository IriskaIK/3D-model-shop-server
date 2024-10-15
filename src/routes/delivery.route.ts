import express, { Router, Request, Response } from 'express';
import isAuthenticated from "../middleware/isAuthenticated.middleware";
import {
    getCitiesByRegion,
    getDeliveryAddresses,
    getPostOfficesByCity,
    getRegions
} from "@/controllers/delivery.controller";

const router: Router = express.Router();

router.get("/", getDeliveryAddresses)
router.get("/regions", getRegions)
router.get("/cities/:region_id", getCitiesByRegion)
router.get("/postOffices/:city_id", getPostOfficesByCity)

export default router;