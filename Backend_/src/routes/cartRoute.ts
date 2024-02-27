import { Router,Request,Response } from "express";
import query from "../db/database";
import authenticateMiddleware from "../middlewares/authMiddleware";
const router=Router;
router.post('/addtocart',authenticateMiddleware,async(req:Request,res:Response)=>{
    
})