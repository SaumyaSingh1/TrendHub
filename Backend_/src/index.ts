import express, { Request, Response } from 'express';
import query from './db/database'; // Import the database query function
import router from './routes/authRoutes'; // Import the router for authentication routes
import bodyParser from 'body-parser'; // Import bodyParser to parse request bodies
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies without it body of incoming data from client can't be read by server 
app.use(bodyParser.json());

// Endpoint to retrieve all customers
app.get("/customers", async (req: Request, res: Response) => {
    try {
        // Query the database to get all customer records
        const result = await query('SELECT *  FROM customer');
        // Send the retrieved customer records as JSON response
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
app.use('/auth', router);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
