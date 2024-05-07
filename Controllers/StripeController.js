const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createIntent = async (req, res) => {
    const { amount } = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur', 
        payment_method_types: ['card'],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  module.exports = { createIntent };