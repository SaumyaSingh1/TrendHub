import express, { Request, Response } from 'express';
import query from '../db/database';

const router = express.Router();

router.post('/product', async (req: Request, res: Response) => {
  try {
    // Extract category and products data from request body
    const {productId, productName,productCost,productImage,productSize } = req.body;

console.log("Frontend data",req.body)
    // Insert each product into the database
  
      // const { productName } = product;
      const queryText = 'INSERT INTO product (product_id,product_name,product_cost,product_image,product_size) VALUES ($1,$2,$3,$4,$5)';
      const values = [productId,productName,productCost,productImage,productSize ];
      await query(queryText, values);
    

    res.status(201).json({ message: 'Products saved successfully' });
    console.log('Products saved');
  } catch (error) {
    console.error('Error saving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
