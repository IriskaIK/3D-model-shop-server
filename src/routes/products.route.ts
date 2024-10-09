import express, { Router, Request, Response } from 'express';
import {getProductByID, getProducts, getTags, getCategories} from "../controllers/products.controller";

const router: Router = express.Router();

router.post('/', getProducts);

router.get('/:id', getProductByID)

router.get('/tags', getTags)

router.get('/categories', getCategories)

export default router;
