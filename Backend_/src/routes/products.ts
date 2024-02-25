import express, { Request, Response } from 'express';
import query from '../db/database';

const router = express.Router();

router.post('/products', async (req: Request, res: Response) => {
  try {
    // Extract category and products data from request body
    const { category, products } = req.body;

    // Insert each product into the database
    for (const product of products) {
      const { alt_description } = product;
      const queryText = 'INSERT INTO products ( product_name) VALUES ($1)';
      const values = [ alt_description];
      await query(queryText, values);
    }

    res.status(201).json({ message: 'Products saved successfully' });
    console.log('Products saved');
  } catch (error) {
    console.error('Error saving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
