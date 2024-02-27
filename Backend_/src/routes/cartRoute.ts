import express, { Router, Request, Response } from 'express';
import query from '../db/database';
import authenticateMiddleware from '../middlewares/authMiddleware';
import { verifyToken } from '../utils/tokenUtils';

const router = express.Router();

router.post('/addtocart',authenticateMiddleware,async(req:Request,res:Response)=>{
    try {
        console.log("add to cart ")
        // Extract productId from the request body
        const { productId } = req.body;
        console.log("Product id is", productId);
    
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
        console.log(userId);
    
        // Insert productId into the addtocart table
        await query('INSERT INTO add_to_cart (product_id, user_id) VALUES ($1, $2)', [productId, userId]);
    
        // Send success response
        res.status(201).json({ message: 'Product added to cart successfully' });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    router.delete('/addtocart', authenticateMiddleware, async (req: Request, res: Response) => {
        try {
          const { productId } = req.body; // Extract productId from request body
      
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
      
          // Delete the product from the cart table
          await query('DELETE FROM add_to_cart WHERE user_id = $1 AND product_id = $2', [userId, productId]);
      
          res.status(200).json({ message: 'Product removed from cart' });
        } catch (error) {
          console.error('Error removing product from cart:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });

      
// GET route to fetch products from the wishlist
router.get('/carts', authenticateMiddleware, async (req: Request, res: Response) => {

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
     // console.log("userId",userId)
  
  
      // Query the database to fetch productIds from the wishlist for the userId
      const result = await query('SELECT product_id FROM add_to_cart WHERE user_id = $1', [userId]);
  
   //console.log("result",result)
  
      // Extract productIds from the query result
      const productIds = result.rows.map((row: any) => row.product_id);
     // console.log("productIds",productIds)
      // Query the product table to fetch products based on productIds
      const productsResult = await query('SELECT * FROM product WHERE product_id = ANY($1)', [productIds]);
  
      // Send the fetched products as JSON response
      const products = productsResult.rows;
      res.json({ products });
    } catch (error) {
    //  console.error('Error fetching products from wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
export default router;