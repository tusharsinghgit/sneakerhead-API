const express = require('express');
const http = require("http");
const path = require('path');
const cors = require('cors');
const routes = require('./routes/index');
const connectDB = require("./db/connect");

// const productRoutes = require('./routes/Product-Routes');
// const userRoutes = require('./routes/User-Routes');
// const cartRoutes = require('./routes/Cart-Routes');
// const wishlistRoutes = require('./routes/Wishlist-Routes');
// const addressRoutes = require('./routes/Address-Router');
// const paymentRoutes = require('./routes/Payment-Router');
// const orderRoutes = require('./routes/Order-Routes');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middlewares

// const corsOptions = {
//     origin: '*', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//     credentials: true, 
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); 

const app = express();
app.use(cors());

const server = http.createServer(app);
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Sneakerhead API! Use /api/products to access products.');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/products',productRoutes);
// app.use('/api/auth', userRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/addresses', addressRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/orders', orderRoutes);


// app.post('/payment-sheet', async (req, res) => {

//     try {

//         const customer = await stripe.customers.create();
//         const ephemeralKey = await stripe.ephemeralKeys.create(
//             { customer: customer.id },
//             { apiVersion: '2024-06-20' }
//         );
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: 1099, // Modify this amount as needed
//             currency: 'inr', // Change to your preferred currency
//             customer: customer.id,
//             automatic_payment_methods: {
//                 enabled: true,
//             },
//         });

//         res.json({

//             paymentIntent: paymentIntent.client_secret,
//             ephemeralKey: ephemeralKey.secret,
//             customer: customer.id,
//             publishableKey: process.env.STRIPE_PUBLISHABLE_KEY, // Add your Stripe publishable key here
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.use('/api', routes);
app.get('/', (req, res) => {
    res.send('Welcome to the Sneakerhead API!.');
});
  

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// const start = async () => {

//     try {
//         await connectDB(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           });
//         app.listen(port, () => {
//             console.log("Server listening on port " + port);
//         })
//     } catch (error) {
//         console.log(error);
//     }

// }

// start();


