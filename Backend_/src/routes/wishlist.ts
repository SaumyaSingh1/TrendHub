import { Router, Request, Response } from "express";
import query from "../db/database";
const router = Router();
// Endpoint to handle adding wishlist items
router.post('/wishlist', async (req: Request, res: Response) => {
  try {
    // Extract userId and productId from the request body
    const { userId, productId } = req.body;

    // Insert the wishlist item into the database
    const queryText = 'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2)';
    await query(queryText, [userId, productId]);

    // Send a success response
    res.status(201).json({ message: 'Item added to wishlist successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error adding item to wishlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

