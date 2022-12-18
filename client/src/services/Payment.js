import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { backendApi } from '../projectConfig';

async function handleCheckout(courseId) {
    let stripe = await loadStripe('pk_test_51M8HKWCuvzY0BCZpQFkHj8ZSCqYaPlaT80wQBurxPWz1n7ZASwUdWqWN8vge5FIOZRo8k0G3Ba6foSnUnr8aPuPO003bMeZ64R')
    await axios.post(`${backendApi}payment/create-checkout-session`,
        { courseId: courseId },
        {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        ,).then((res) => {
            stripe.redirectToCheckout({ sessionId: res.data.id });
        }).catch((err) => {
            console.warn(err);
        });
}

export { handleCheckout }