import express, { Router, Request, Response } from "express";
import query from "../db/database";
import authenticateMiddleware from "../middlewares/authMiddleware";
import { verifyToken } from "../utils/tokenUtils";

const router = express.Router();

// Endpoint to handle payment initiation
router.post('/payment', authenticateMiddleware, async (req: Request, res: Response) => {
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

    // Extract the productId from the request body
    const { productId } = req.body;
    console.log("productId", productId);
    const postProductInOrders=await query(`INSERT INTO orders(product_id,user_id) VALUES($1,$2)`,[productId,userId])
    console.log("postProductInOrders",postProductInOrders)
    // Query to fetch the orderId based on userId and productId
    const orderIdObject = await query(`SELECT order_id FROM orders WHERE user_id = $1 AND product_id = $2`, [userId, productId]);
    console.log("orderIdObject", orderIdObject);

    // Check if any rows are returned
    if (orderIdObject.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found for the provided user and product' });
    }

    // Extract the orderId from the query result
    const orderId = orderIdObject.rows[0].order_id;
    console.log("orderId", orderId);

    // Insert the userId and productId into the payment table
    await query(`INSERT INTO payment (order_id, user_id, product_id) VALUES ($1, $2, $3)`, [orderId, userId, productId]);

    // Send a success response
    res.status(200).json({ message: 'Payment initiated successfully' });
  } catch (error) {
    // Handle any errors that occur during the payment process
    console.error('Error initiating payment process:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
