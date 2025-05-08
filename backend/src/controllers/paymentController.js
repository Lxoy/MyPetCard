import Stripe from 'stripe';

import dotenv from "dotenv";
import { getUserById, updateUserStripeId, getPlan } from '../utils/dbUtils.js';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const getPaymentSheet = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const user = await getUserById(userId);
    
    if (!user[0].stripe_customer_id) {
        console.log("Unutarifa", user[0].first_name);
        const customer = await stripe.customers.create({
            email: user[0].email,
            name: `${user[0].first_name || ''} ${user[0].last_name || ''}`.trim(),
            metadata: {
                userId: user[0].id,
                username: user[0].username
            }
        });

        user[0].stripe_customer_id = customer.id;
        await updateUserStripeId(userId, user[0].stripe_customer_id);
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: user[0].stripe_customer_id },
        { apiVersion: '2025-04-30.basil' }
    );

    const plan = await getPlan("Yearly plan");
    console.log(plan.price);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: plan.price,
        currency: 'eur',
        customer: user[0].stripe_customer_id,
        automatic_payment_methods: { enabled: true },
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: user[0].stripe_customer_id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
};