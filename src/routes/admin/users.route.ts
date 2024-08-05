import express, { Router, Request, Response } from 'express';
import {getUserByID, getUsers} from "../../controllers/admin/users.controller";
import isAuthenticated from "../../middleware/isAuthenticated.middleware";

const router: Router = express.Router();

// router.use(isAuthenticated('admin'))
router.post('/', getUsers);

router.get('/user/:id', getUserByID)
//
// router.get('/tags', getTags)
//
// router.get('/categories', getCategories)

export default router;
