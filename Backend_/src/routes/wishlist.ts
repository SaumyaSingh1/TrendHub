import express,{Router,Request,Response, NextFunction} from 'express';

import query from '../db/database';
const router = express.Router();

router.post('/wishlist', async (req, res) => {
  const {  productId } = req.body;

  try {
    // Your database query to insert into the wishlist table
    // Example:
     await query('INSERT INTO wishlist ( product_id) VALUES ($1)', [ productId]);

    res.status(201).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});
router.get('/wishlist', async (req: Request, res: Response) => {
  try {
    // Query the wishlist table to get product IDs
    const result = await query('SELECT product_id FROM wishlist');
    const productIds = result.rows.map((row: any) => row.product_id);

    // Query the products table to get details of products with the fetched product IDs
    const productsResult = await query('SELECT * FROM products WHERE id IN ($1)', [productIds]);

    // Send the retrieved products as JSON response
    res.json(productsResult.rows);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }});

export default router;
