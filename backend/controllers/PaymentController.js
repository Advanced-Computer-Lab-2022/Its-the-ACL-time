
const { PaymentModel } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const addPayment = async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'payment_intent.succeeded' || eventType === 'checkout.session.completed') {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    const { id, subscription, customer } = data.object;
    console.log('💰 Payment captured!');
    console.log(" session ", data.object);
    PaymentModel.create({ id, subscription, customer });
  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
  }
  res.sendStatus(200);
};

const getPaymentSession = async (req, res) => {
  const {quantity,priceId} = req.body;
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/SuccessPayment?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/FailedPayment',
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price: priceId,
      quantity: quantity
    }]
  })
  res.json({
    id: session.id
  });

}

const createProduct = async (productName) => {
  const product = await stripe.products.create(
    { name: productName }
  );
  return product;
}

const getProduct = async (productId) => {
  const product = await stripe.products.retrieve(productId);
}

const updateProduct = async (productId, data) => {
  // update product with data 
  // data is a object declare the values which will be updated others values will remain unchanged
  return await stripe.products.update(productId, data);
}

const allProduct = async (limit) => {
  return await stripe.products.list({ limit: limit });
}

const deleteProduct = async (productId) => {
  return await stripe.products.del(
    productId
  );
}

const createPrice = async (unit_amount,productId,currency='usd') => {
  // create price for a product required productId , unit_amount, and currency
  return await stripe.prices.create({
    unit_amount: unit_amount,
    currency: currency,
    product: productId,
  });
}



module.exports = { getPaymentSession, addPayment };



