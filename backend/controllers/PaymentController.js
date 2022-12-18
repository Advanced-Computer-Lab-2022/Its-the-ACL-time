
const { default: mongoose } = require('mongoose');
const { PaymentModel, User, Course, Wallet } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const addPayment = async (request, response) => {
  const event = request.body;
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentIntent = event.data.object;
      PaymentModel.create({ sessionId: event.id, customerId: paymentIntent.client_reference_id, paymentId: paymentIntent.id });
      const client_reference_id = paymentIntent.client_reference_id.split('#');
      const userId = client_reference_id[0];
      const courseId = client_reference_id[1];
      const UserObject = await User.findById(userId);
      UserObject.courses.push({ courseId: courseId });
      UserObject.save();
      const CourseObject = await Course.findById(courseId);
      const balance = await Wallet.findOne({ owner: mongoose.Types.ObjectId(CourseObject.createdBy) });
      console.log("balance", balance);
      const wallet = await Wallet.updateOne({ owner: CourseObject.createdBy }, { balance: balance.balance + CourseObject.price * (1 - CourseObject.promotion / 100) });
      console.log("wallet", wallet);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
};

const getPaymentSession = async (req, res) => {
  const { userId } = req.user;
  const { courseId } = req.body;
  if (!courseId) {
    req.status(401).json({ msg: "please provide the course Id" });
  }
  const CourseObject = await Course.findById(mongoose.Types.ObjectId(courseId));
  let productId = CourseObject?.stripeProductId;
  const client_reference_id = userId + "#" + courseId;
  const unit_amount = CourseObject.price;
  const currency = "USD";
  if (!productId) {
    productId = await stripe.products.create(
      { name: CourseObject.title }
    );
    productId = productId.id;
    CourseObject.stripeProductId = productId;
  }
  let priceId = CourseObject.stripePriceId;
  if (!priceId) {
    priceId = await stripe.prices.create({
      unit_amount: unit_amount * 100,
      currency: currency,
      product: productId,
    });
    priceId = priceId.id;
    CourseObject.stripePriceId = priceId;
  }
  await CourseObject.save();
  const coupon = await stripe.coupons.create({ percent_off: CourseObject.promotion || 1, duration: 'once' });
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/SuccessPayment?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/FailedPayment',
    payment_method_types: ['card'],
    mode: 'payment',
    client_reference_id: client_reference_id,
    line_items: [{
      price: priceId,
      quantity: 1
    }],
    discounts: [{
      coupon: coupon.id,
    }],
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

const createPrice = async (unit_amount, productId, currency = 'usd') => {
  // create price for a product required productId , unit_amount, and currency
  return await stripe.prices.create({
    unit_amount: unit_amount,
    currency: currency,
    product: productId,
  });
}



module.exports = { getPaymentSession, addPayment };



