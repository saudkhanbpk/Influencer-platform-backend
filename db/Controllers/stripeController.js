// controllers/stripeController.js
// controllers/stripeController.js
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);
console.log("nnnnnnnn", process.env.SECRET_KEY)

exports.handlePayment = async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  // return console.log(token)
  try {
    await stripe.charges.create({
      // amount,
      // currency: 'usd',
      // payment_method_types: ['card'],
      // payment_method: token.id,
      // confirm: true,
      source:token.id,
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

