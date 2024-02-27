import express, { Request, Response } from 'express';
import query from '../db/database';

const router = express.Router();

router.post('/product', async (req: Request, res: Response) => {
  try {
    // Extract category and products data from request body
    const {productID,imageId ,productName,productCost,productImage,productSize } = req.body;

console.log("Frontend data",req.body)
    // Insert each product into the database
  
      // const { productName } = product;
      const queryText = 'INSERT INTO product (product_id,image_id,product_name,product_cost,product_image,product_size) VALUES ($1,$2,$3,$4,$5,$6)';
      const values = [productID,imageId,productName,productCost,productImage,productSize ];
      await query(queryText, values);
    

    res.status(201).json({ message: 'Products saved successfully' });
    console.log('Products saved');
  } catch (error) {
    console.error('Error saving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/product', async (req, res) => {
  try {
    // Query the database to fetch all product IDs
    const result = await query('SELECT product_id FROM product');

    // Extract product IDs from the query result
    const productIds = result.rows.map(row => row.product_id);

    // Send the product IDs as JSON response
    res.json({ productIds });
  } catch (error) {
    console.error('Error fetching product IDs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
