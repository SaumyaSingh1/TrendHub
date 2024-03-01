// Assuming you're using Express.js
import express,{Request,Response,Router} from 'express'// Import your database library
import query from "../db/database";
import { verifyToken } from "../utils/tokenUtils";
import authenticateMiddleware from "../middlewares/authMiddleware";
const router=Router();
// Define your checkout route
router.post('/checkout',authenticateMiddleware ,async (req:Request, res:Response) => {
    try {

        // Extract the product ID from the request body
        const { productId } = req.body;
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
   console.log("userId",userId)
// Assuming you're using some sort of parameterized query function like `query` for interacting with your database
await query('INSERT INTO orders (product_id, user_id) VALUES ($1, $2)', [productId, userId]);


        // Send a success response
        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ error: 'An error occurred while processing the order' });
    }
});
router.get('/checkout',authenticateMiddleware,async(req:Request, res:Response)=>{
    try {
      console.log("checkouts first line")
             // Verify the access token
    const accessToken = req.newAccessToken || req.cookies.accessToken;
    const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
    const decodedToken = verifyToken(accessToken, accessSecret);
    console.log("checkouts accessToken",accessToken)
    // Ensure decodedToken is not null
    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the userId from the decoded token
    const userId: number = decodedToken.user_id;
   console.log("userId in checkouts",userId)
// Assuming you're using some sort of parameterized query function like `query` for interacting with your database
const productIdList=await query('SELECT product_id FROM orders WHERE user_id=$1', [userId]);

console.log("checkouts  productIdList",productIdList)

const productIds = productIdList.rows.map(row => row.product_id);

// Filter out any undefined or null values
const validProductIds = productIds.filter(productId => productId !== undefined && productId !== null);

// Check if there are valid product IDs to fetch
if (validProductIds.length === 0) {
    // Handle case where there are no valid product IDs
    console.error('No valid product IDs found');
    return res.status(400).json({ error: 'No valid product IDs found' });
}

// Construct comma-separated list of valid product IDs
const productIdString = validProductIds.join(',');
console.log('product ids:',productIds)

// Fetch product details using valid product IDs
const productDetails = await query(`SELECT * FROM product WHERE product_id IN (${productIdString})`);
console.log("productDetails",productDetails)
// Send product details in response
res.status(200).json({ message: 'Product details fetched successfully', productDetails });

        
    } catch (error) {
        console.error('Error processing order detail', error);
        res.status(500).json({ error: 'An error occurred while processing the order detail' });
    }
});

export default router