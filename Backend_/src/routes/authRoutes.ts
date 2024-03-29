import { Router, Request, Response } from 'express';
import customer from '../models/customer';
import query from '../db/database';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken,verifyToken} from '../utils/tokenUtils';
import authenticateMiddleware from '../middlewares/authMiddleware';
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
           console.log(email);
        // Validate email and password
        if (!email || !password) {
            console.log("Please provide email and password both!");
        }
        console.log("2nd");
        // Check if customer exists
        const customerExist = await query<customer>('SELECT * FROM customer WHERE email=$1', [email]);
        if (customerExist.rows.length === 0) {
            return res.status(400).json({ message: 'Customer does not exist' });
        }
        console.log("3rd");
        // Validate password
        const user = customerExist.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        console.log("4th");
        // Generate tokens
        const userId = user.user_id;
        const accessToken = generateAccessToken({ user_id: userId});
        const refreshToken = generateRefreshToken({ user_id: userId });
        console.log(userId);
        // Store refresh token in the database
        await query<customer>('UPDATE customer SET refresh_token=$1 WHERE user_id=$2', [refreshToken, userId]);
        console.log("refresh token:",refreshToken);
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
// Logout Route
router.post('/logout', authenticateMiddleware,  async (req: Request, res: Response) => {
    try {
      // The authentication middleware will handle token refresh if needed
  
      // Verify the access token from cookies
      const accessToken = req.newAccessToken || req.cookies.accessToken;
      const accessSecret = process.env.ACCESS_TOKEN_SECRET as string; // Use your environment variable
  
      // Log the access token
      console.log('Access Token:', accessToken);
  
      // Verify the access token
      const decodedToken = verifyToken(accessToken, accessSecret);
  
      // Log the decoded token
      console.log('Decoded Token:', decodedToken);
  
      // If the token is invalid or expired, return an unauthorized response
      if (!decodedToken) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Extract the user ID from the decoded token
      const userId: number = decodedToken.user_id;
  
      // Clear the refresh token in the database 
      await query('UPDATE customer SET refresh_token = NULL WHERE user_id = $1', [userId]);
  
      // Clear the access and refresh tokens from cookies
      res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'strict' });
      res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
  console.log("logged out")
      // Respond with a successful logout message
      res.status(200).json({ message: 'Logout successful' });
    } catch (error: any) {
      // Log and respond with an internal server error if an exception occurs
      console.error('Error during logout:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
export default router;
