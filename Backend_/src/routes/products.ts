// import {Router,Request,Response} from express
// import axios from 'axios';

// const router=Router;
// // Route to fetch data from Unsplash API
// router.get('/api/products/:category', async (req:Request, res:Response) => {
//   const { category } = req.params;
//   try {
//     // Make request to Unsplash API
//     const response = await axios.get(`https://api.unsplash.com/search/photos`, {
//       params: {
//         client_id: process.env.VITE_UNSPLASH_CLIENT_ID,
//         query: category,
//         orientation: 'portrait'
//       }
//     });

//     // Process data
//     const products = response.data.results.map(product => ({
//       name: product.description || product.alt_description || 'Untitled',
//       image_url: product.urls.regular,
//       likes: product.likes,
//     }));

//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
