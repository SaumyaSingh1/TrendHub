import express,{ Router,Request,Response } from "express";
import query from "../db/database";
import authenticateMiddleware from "../middlewares/authMiddleware";
import { verifyToken } from "../utils/tokenUtils";
const router=express.Router();
router.get('/orders', authenticateMiddleware, async (req: Request, res: Response) => {
    try {
        // Verify the access token
        const accessToken = req.newAccessToken || req.cookies.accessToken;
        const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
        const decodedToken = verifyToken(accessToken, accessSecret);

        // Ensure decodedToken is not null
        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Extract the userId from the decoded token
        const userId: number = decodedToken.user_id;
        console.log("userId", userId);

        // Fetch payment_id of the user from the orders table 
        const paymentIdResponse = await query(`SELECT payment_id FROM payment WHERE user_id = $1`, [userId]);
        const paymentId = paymentIdResponse.rows[0]?.payment_id;
        console.log("paymentId",paymentId)
        // Check if paymentId is valid
        if (!paymentId) {
            return res.status(404).json({ error: 'Payment ID not found' });
        }

        // Fetch product IDs from the orders table
        const orderProductsResponse = await query(`SELECT product_id FROM orders WHERE user_id = $1`, [userId]);
        const productIds = orderProductsResponse.rows.map((row: any) => row.product_id);

        // Check if productIds array is empty
        if (productIds.length === 0) {
            return res.status(404).json({ error: 'No products found for the user' });
        }

        // Fetch product details corresponding to the product IDs
        const productsResponse = await query(`SELECT * FROM product WHERE product_id IN (${productIds.map((_, index) => `$${index + 1}`).join(",")})`, productIds);

        // Send the fetched products back to the client
        res.status(200).json({ products: productsResponse.rows });
    } catch (error) {
        console.error("Error displaying order:", error);
        res.status(500).json({ error: "An error occurred while Showing the order" });
    }
});

export default router;