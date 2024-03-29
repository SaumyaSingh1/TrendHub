import express, { Request, Response } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import query from './db/database'; // Import the database query function
import authRouter from './routes/authRoutes'; // Import the router for authentication routes
import bodyParser from 'body-parser'; // Import bodyParser to parse request bodies
import * as dotenv from "dotenv" 
 import productRouter from './routes/products'
 import wishlistRouter from './routes/wishlist'
 import orderRouter from './routes/orders'
import paymentRouter from './routes/payment'
import cartRouter from'./routes/cartRoute'
import checkoutRouter from './routes/checkout'
import productIdRouter from './routes/products'
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from a .env file
dotenv.config();
// Enable CORS middleware with credentials support
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  
  // Parse incoming JSON requests with a size limit of 16kb
  app.use(express.json());
  
  // Parse incoming URL-encoded requests with a size limit of 16kb
  app.use(express.urlencoded({ extended: true}));
  
  // Serve static files from the "public" directory
  app.use(express.static("public"));
  
  // Parse cookies using cookie-parser middleware
  app.use(cookieParser());
  
// Middleware to parse JSON bodies without it body of incoming data from client can't be read by server 
app.use(bodyParser.json());

///Endpoint to retrieve all wishlist items
app.get("/api/wishlist", async (req: Request, res: Response) => {
    try {
        // Query the database to get all wishlist items
        const result = await query('SELECT * FROM wishlist');
        // Send the retrieved wishlist items as JSON response
        res.json(result.rows);
    } catch(err) {
        // Handle errors if any occur during database query
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Default endpoint to test server connectivity
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Mount authentication routes under the '/auth' path
app.use('/auth', authRouter);

 app.use('/api',productRouter)

app.use('/api',productIdRouter)
app.use('/api',wishlistRouter)

app.use('/api',cartRouter)
app.use('/api',checkoutRouter)
// Start the server and listen on the specified port
app.use('/api',paymentRouter)
app.use('/api',orderRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
