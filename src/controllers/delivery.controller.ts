import {NextFunction, Response, Request} from "express";
import PostOffice from "@/models/postOffice.model";
import City from "@/models/city.model";
import Region from "@/models/region.model";
import {DatabaseError} from "@/types/customError.types";
import {CitiesByRegionId, PostOfficesByCityId} from "@/types/delivery/request.types";

export async function getDeliveryAddresses(req: Request, res: Response, next: NextFunction) {
    try {
        const regionsWithCitiesAndPostOffices =  await Region.query().withGraphFetched('[cities.[postOffices]]')
        res.status(200).json(regionsWithCitiesAndPostOffices);
    }catch (e){
        next(new DatabaseError('DB Error: Error during fetching delivery addresses'));
    }
}


export async function getRegions(req: Request, res: Response, next: NextFunction) {
    try {
        const regions=  await Region.query()
        res.status(200).json(regions);
    }catch (e){
        next(new DatabaseError('DB Error: Error during fetching delivery addresses'));
    }
}

export async function getCitiesByRegion(req: Request<CitiesByRegionId>, res: Response, next: NextFunction) {
    try {
        const cities =  await City.query().where('region_id', '=', req.params.region_id)
        res.status(200).json(cities);
    }catch (e){
        next(new DatabaseError('DB Error: Error during fetching delivery addresses'));
    }
}

export async function getPostOfficesByCity(req: Request<PostOfficesByCityId>, res: Response, next: NextFunction) {
    try {
        const postOffices =  await PostOffice.query().where('city_id', '=', req.params.city_id)
        res.status(200).json(postOffices);
    }catch (e){
        next(new DatabaseError('DB Error: Error during fetching delivery addresses'));
    }
}