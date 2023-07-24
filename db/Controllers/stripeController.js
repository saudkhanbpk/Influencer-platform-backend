// controllers/stripeController.js
const Stripe = require('stripe')(process.env.SECRET_KEY);

exports.handlePayment = async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    console.error(error);
    status = 'Failure';
    error = error.message;
  }
  res.json({ error, status });
};
