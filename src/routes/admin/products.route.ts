import express, { Router, Request, Response } from 'express';
import isAuthenticated from "../../middleware/isAuthenticated.middleware";
import {getProducts, getProductById, deleteProductById, updateProductById} from "@/controllers/admin/prdoucts.controller";

const router: Router = express.Router();

// router.use(isAuthenticated('admin'))

router.post('/', getProducts);
router.get('/:id', getProductById)

router.put('/:id', updateProductById)

router.delete('/:id', deleteProductById)


export default router;
