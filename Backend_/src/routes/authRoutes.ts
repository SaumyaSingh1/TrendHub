import { Router, Request, Response } from 'express';
import customer from '../models/customer';
import query from '../db/database';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';

const router = Router();

// Signup route
router.post('/signup', async (req: Request, res: Response) => {
    try {
        // Extract data from request body
        let { name, email, password, contact, address }: customer = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        // Trim leading and trailing whitespaces
        email = email.trim();
        password = password.trim();

        // Check if email already exists
        const emailExist = await query<customer>('SELECT * FROM customer WHERE email=$1', [email]);

        if (emailExist.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        const result = await query<customer>(
            'INSERT INTO customer(name, email, password, contact, address) VALUES($1,$2,$3,$4,$5) RETURNING user_id',
            [name, email, hashedPassword, contact, address]
        );

        // Generate access and refresh tokens
        const accessToken = generateAccessToken({ user_id: result.rows[0].user_id });
        const refreshToken = generateRefreshToken({ user_id: result.rows[0].user_id });

        // Store refresh token in the database
        await query<customer>('UPDATE customer SET refresh_token =$1 WHERE user_id=$2', [refreshToken, result.rows[0].user_id]);

        // Send tokens as cookies
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

        // Send response
        res.status(201).json({ message: 'User Registered successfully', userId: result.rows[0].user_id, accessToken, refreshToken });
    } catch (error: any) {
        // Handle errors during sign-up
        console.error('Error during sign-up:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        // Extract email and password from request body
        let { email, password }: customer = req.body;

        // Validate email and password
        if (!email || !password) {
            console.log("Please provide email and password both!");
        }

        // Check if customer exists
        const customerExist = await query<customer>('SELECT * FROM customer WHERE email=$1', [email]);
        if (customerExist.rows.length === 0) {
            return res.status(400).json({ message: 'Customer does not exist' });
        }

        // Validate password
        const user = customerExist.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Generate tokens
        const userId = user.user_id;
        const accessToken = generateAccessToken({ user_id: userId});
        const refreshToken = generateRefreshToken({ user_id: userId });

        // Store refresh token in the database
        await query<customer>('UPDATE customer SET refresh_token=$1 WHERE user_id=$2', [refreshToken, userId]);

        // Send tokens and user ID in the response
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('userId', userId, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ userId, accessToken, refreshToken, message: 'Login successful' });
    } catch (error: any) {
        // Handle errors during login
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
