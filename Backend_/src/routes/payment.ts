// import express,{ Router,Request,Response } from "express";
// import query from "../db/database";
// import authenticateMiddleware from "../middlewares/authMiddleware";
// import { verifyToken } from "../utils/tokenUtils";
// const router=express.Router();
// router.post('/payment', authenticateMiddleware, async (req: Request, res: Response) => {
//     try {
//          // Verify the access token
//     const accessToken = req.newAccessToken || req.cookies.accessToken;
//     const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
//     const decodedToken = verifyToken(accessToken, accessSecret);

//     // Ensure decodedToken is not null
//     if (!decodedToken) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Extract the userId from the decoded 
//     const userId: number = decodedToken.user_id;
//    console.log("userId",userId)
