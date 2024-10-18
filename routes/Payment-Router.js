const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PoQc6IXIpuJcboilOPk3s9KBnwXbeHqTefs65rgu8rAD3YtfdKqbMogq3phPiaCViTlz11Wc06vvR0IRZsJY72500xyp1PNXf');

router.post('/intents', async(req, res) => {

    try{

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'INR',
            automatic_payment_methods:{
                enabled:true
            }
        })
    
        res.json({paymentIntent: paymentIntent.client_secret})

    }catch(err){
        console.error(err);
        res.status(400).json({ message: err.message });
    }
    
})

module.exports = router;