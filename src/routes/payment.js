// routes/payment.js or similar
const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const priceMap = {
  basic: 'price_1QsG7UJM9A8ABnWIGngDlmkD',
  professional: 'price_1QsG8mJM9A8ABnWINN8kgfNk',
  premium: 'price_1QsG9RJM9A8ABnWIbQqfj2k8',
  'growing-team': 'prod_SP3CSKZ8af13Gv',
  'enterprise-team': 'prod_SP3Hst06pLVSbS',
};

router.post('/checkout-session', async (req, res) => {
  const { planId, billing, name, amount } = req.body;

  const priceId = priceMap[planId];
  if (!priceId) {
    return res.status(400).json({ error: 'Invalid plan ID' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Use the actual price ID from Stripe
          quantity: 1,
        },
      ],
      success_url: `https://primereferral.vercel.app/packages/checkout?plan=${planId}&billing=${billing}&session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name)}&amount=${amount}`,
      cancel_url: `https://primereferral.vercel.app/packages/`,
    });

    res.json({ 
      url: session.url,
      paymentIntentId: session.payment_intent,
      name,        // pass back for frontend use
      amount       // pass back for frontend use
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({ paymentIntentId: session.payment_intent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;

