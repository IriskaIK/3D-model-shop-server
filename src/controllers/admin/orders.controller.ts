import {NextFunction, Response, Request} from "express";
import Order from "@/models/order.model";

import {ValidationError, DatabaseError, NotFoundError, AuthorizationError} from "@/types/customError.types";


export async function getOrders(req: Request, res: Response, next: NextFunction) {

}
export async function getOrderById(req: Request, res: Response, next: NextFunction) {

}
export async function updateOrderById(req: Request, res: Response, next: NextFunction) {

}
export async function changeOrderStatusById(req: Request, res: Response, next: NextFunction) {

}
export async function deleteOrderById(req: Request, res: Response, next: NextFunction) {

}