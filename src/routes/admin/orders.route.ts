import express, { Router, Request, Response } from 'express';
import isAuthenticated from "../../middleware/isAuthenticated.middleware";
import {
    changeOrderStatusById,
    deleteOrderById,
    getOrderById,
    getOrders,
    updateOrderById
} from "@/controllers/admin/orders.controller";

const router: Router = express.Router();

// router.use(isAuthenticated('admin'))

router.get('/', getOrders)
router.get('/:id', getOrderById)

router.put('/:id', updateOrderById)
router.put('/:id/status', changeOrderStatusById)

router.delete('/:id', deleteOrderById)


export default router;
