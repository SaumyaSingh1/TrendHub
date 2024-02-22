import { Router, Request, Response } from 'express';
// import cookieParser from 'cookie-parser';
import customer from '../models/customer';
import query from '../db/database';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';

const router = Router();
// router.use(cookieParser());
console.log("refresh token : ",process.env.REFRESH_TOKEN_SECRET);


// signup route
router.post('/signup', async (req: Request, res: Response) => {
    try {
        let { name, email, password, contact, address }: customer = req.body;
        console.log(req.body);
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        // Trim leading and trailing whitespaces
        email = email.trim();
        password = password.trim();

        // if user already exist
        const emailExist = await query<customer>('SELECT * FROM customer WHERE email=$1', [email]);

        if (emailExist.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // INSERT NEW ENTRY
        const result = await query<customer>(
            'INSERT INTO customer(name, email, password,contact,address) VALUES($1,$2,$3,$4,$5) RETURNING user_id',
            [name, email, hashedPassword, contact, address]
        );

        // MAKING REFRESH TOKEN
        const accessToken = generateAccessToken({ user_id: result.rows[0].user_id, email });
        const refreshToken = generateRefreshToken({ user_id: result.rows[0].user_id, email });



        // STORE REFRESH TOKEN IN DATABASE
        await query<customer>('UPDATE customer SET refresh_token =$1 WHERE user_id=$2', [refreshToken, result.rows[0].user_id]);

        // SEND TOKEN AS COOKIES
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

        res.status(201).json({ message: 'User Registered successfully', userId: result.rows[0].user_id, accessToken, refreshToken });
    } catch (error:any) {
        // Handle errors during sign-up
        console.error('Error during sign-up:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
