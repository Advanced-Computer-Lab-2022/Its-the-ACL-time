import React from 'react'
import { usePaymentContext } from '../context/Payment/payment'
export default function Payment() {

   // TODO only for testing purpose 
   
   const handleCheckout = usePaymentContext();
   console.log('payment',handleCheckout);
  return (
    <div className="container d-flex justify-content-center">
        <button className='btn btn-lg btn-primary' onClick={()=>handleCheckout(3,'price_1M8JRvCuvzY0BCZpqmytQWdY')}>checkout</button>
    </div>
  )
}
