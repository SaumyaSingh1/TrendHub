// import express,{ Router,Request,Response } from "express";
// import query from "../db/database";
// import authenticateMiddleware from "../middlewares/authMiddleware";
// import { verifyToken } from "../utils/tokenUtils";
// const router=express.Router();
// router.post('/orders', authenticateMiddleware, async (req: Request, res: Response) => {
//     try {
//          // Verify the access token
//     const accessToken = req.newAccessToken || req.cookies.accessToken;
//     const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
//     const decodedToken = verifyToken(accessToken, accessSecret);

//     // Ensure decodedToken is not null
//     if (!decodedToken) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Extract the userId from the decoded token
//     const userId: number = decodedToken.user_id;
//    console.log("userId",userId)
//         // Retrieve product IDs from the payment table for the user
//         const paymentResult = await query(`SELECT product_id FROM payment WHERE user_id=$1`, [userId]);
        
//         // Extract product IDs from the result
//         const productIds = paymentResult.rows.map(row => row.product_id);
        
//         // Insert product IDs into the orders table
//         const insertQuery = `INSERT INTO orders (product_id) VALUES ${productIds.map((id, index) => `($${index + 1})`).join(', ')}`;
//         await query(insertQuery, productIds);
        
//         // Fetch product details related to the product IDs from the products table
//         const productsQuery = `
//             SELECT  product_name, product_cost 
//             FROM product
//             WHERE product_id IN (${productIds.map((id, index) => `$${index + 1}`).join(', ')})
//         `;
//         const productDetailsResult = await query(productsQuery, productIds);
        
//         // Send the fetched product details as the response
//         res.json(productDetailsResult.rows);
        
//     } catch (error) {
//         console.error("Error processing order:", error);
//         res.status(500).json({ error: "An error occurred while processing the order" });
//     }
// });
// export default router;