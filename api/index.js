require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const connectDB = require("../db/connect");
const productRoutes = require('../routes/Product-Routes');
const userRoutes = require('../routes/User-Routes');
const cartRoutes = require('../routes/Cart-Routes');
const wishlistRoutes = require('../routes/Wishlist-Routes');
const addressRoutes = require('../routes/Address-Router');
const paymentRoutes = require('../routes/Payment-Router');
const orderRoutes = require('../routes/Order-Routes');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middlewares

const corsOptions = {
    origin: '*', // Change this to your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    credentials: true, // Allow credentials if needed
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow preflight requests

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Sneakerhead API! Use /api/products to access products.');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products',productRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);


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

app.get('/', (req, res) => {
    res.send('Welcome to the Sneakerhead API! Use /api/products to access products.');
});
  

const port = process.env.PORT || 5000;

const start = async () => {

    try {
        await connectDB(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        app.listen(port, () => {
            console.log("Server listening on port " + port);
        })
    } catch (error) {
        console.log(error);
    }

}

start();


