import express, { Router } from 'express';
import {adminLogInHandler, logOutHandler} from "../../controllers/admin/auth.controller";
import ensureAuthenticated from "../../middleware/isAuthenticated.middleware";

const router: Router = express.Router();

router.get('/',  ensureAuthenticated("admin"), (req, res)=>{
    res.status(200).json({ msg: 'Authenticated' });
})

router.post('/login', adminLogInHandler);


router.post('/logout', logOutHandler);

export default router;
