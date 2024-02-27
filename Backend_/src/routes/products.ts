import express, { Request, Response } from 'express';
import query from '../db/database';
import { QueryResult } from 'pg'; 
const router = express.Router();

router.post('/product', async (req: Request, res: Response) => {
  try {
    // Extract product data from request body
    const { productID, imageId, productName, productCost, productImage, productSize } = req.body;

    console.log("Frontend products:",req.body);
    // Check if the product already exists in the product table
    const existingProduct = await query('SELECT * FROM product WHERE product_id = $1', [productID]);
   
console.log("existing prod:",existingProduct)

    if (existingProduct.rows.length > 0) {
      // Product exists in the product table
      console.log('Product already exists in the product table');
      res.status(200).json({ message: 'Product already exists in the product table' });
      return;
    }

    // If the product does not exist, insert it into the product table
    const queryText = 'INSERT INTO product (product_id, image_id, product_name, product_cost, product_image, product_size) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [productID, imageId, productName, productCost, productImage, productSize];
    console.log('SQL query:', queryText);
    console.log('Values:', values);
    
    await query(queryText, values);

    res.status(201).json({ message: 'Product saved successfully' });
    console.log('Product saved');
  } catch (error) {
    console.error('Error saving product:', error);
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
//to check particular product already exist or not



export default router;
