import express, { Router, Request, Response, NextFunction } from 'express';
import {regUser, logInHandler, logOutHandler} from "../controllers/auth.controller";
import isAuthenticated from "../middleware/isAuthenticated.middleware";

const router: Router = express.Router();

router.get('/',  isAuthenticated, (req, res)=>{
    res.status(200).json({ msg: 'Authenticated' });
})





router.post('/login', logInHandler);

router.post('/register', regUser)

router.post('/logout', logOutHandler);

export default router;
