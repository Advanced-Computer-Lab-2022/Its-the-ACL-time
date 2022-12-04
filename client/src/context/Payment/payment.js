

import React, { useContext,createContext } from 'react'
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { backendApi } from '../../projectConfig';

const PaymentContext = createContext();
function PaymentProvider({children}) {
    async function handleCheckout(quantity,priceId) {
        let stripe = await loadStripe('pk_test_51M8HKWCuvzY0BCZpQFkHj8ZSCqYaPlaT80wQBurxPWz1n7ZASwUdWqWN8vge5FIOZRo8k0G3Ba6foSnUnr8aPuPO003bMeZ64R')
        await axios.post(`${backendApi}payment/create-checkout-session`, { "quantity": quantity,"priceId":priceId}).then((res) => {
            stripe.redirectToCheckout({ sessionId: res.data.id });
        }).catch((err) => {
            console.warn(err);
        });
    }
    return (
        <PaymentContext.Provider value={handleCheckout}>
            {children}
        </PaymentContext.Provider>
    )
  
}

const usePaymentContext = ()=>{
    return useContext(PaymentContext);
}

export {PaymentProvider,usePaymentContext}
