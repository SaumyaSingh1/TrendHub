import { Router,Request,Response } from "express";
import customer from '../models/customer'
import query from "../db/database";
import bcrypt from 'bcrypt'
const router=Router();
//signup route
router.post('/signup',async (req:Request,res:Response)=>{
   try{ let { name,email, password,contact,address}:customer=req.body;
    console.log(req.body);
    if(!name || !email || !password){
        return res.status(400).json({message:"Please provide name, email, and password"})
    }

    // Trim leading and trailing whitespaces
     email = email.trim();
     password = password.trim();

    //if user already exist
     const emailExist= await query<customer>('SELECT * FROM customer WHERE email=$1',[email])

     if (emailExist.rows.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
    }

     const hashedPassword = await bcrypt.hash(password, 10);

     //INSERT NEW ENTRY 
    const result=await query<customer>('INSERT INTO customer(name, email, password,contact,address) VALUES($1,$2,$3,$4,$5) RETURNING user_id',[ name,email, hashedPassword,contact,address])

    res.status(201).json({ message: "User created successfully", userId: result.rows[0].user_id });
}
catch(error:any){
    // Handle errors during sign-up
    console.error('Error during sign-up:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
}
})

export default router;