import {  useShoppingCart } from "use-shopping-cart";
import { useState } from "react";
import CartItem from "src/components/CartItem"
import axios  from "axios";
export default function Cart() {
const {cartCount,clearCart,cartDetails,formattedTotalPrice,redirectToCheckout} = useShoppingCart()
const [isRedirecting,setRedirecting]=useState(false)
async function onCheckOut(){
if(cartCount>0){
  try{
setRedirecting(true)
const {id}= await axios.post('/api/checkout-sessions',cartDetails)
.then(res=>res.data);
const result= await redirectToCheckout(id);
if(result?.error){
  console.log("Error in result",result);
}
  } catch(error){
console.log("Error",error);
  }
finally{
  setRedirecting(false)
}

}

}

  return (
    <div>
      {
        cartCount>0 ?(
<div> <h2>Your shopping cart:</h2>
<span>{`${cartCount} items  `}<button onClick={()=>clearCart()}>(Clear all)</button></span>
 
 <div>

  {Object.entries(cartDetails).map(([productId, product])=>(
    <CartItem key={productId} product={product} />
  ))}
  </div>
 
 </div>

        ):(
          <div> <h2>Your shooping cart is empty</h2>
          <p>Check our awecome products {""}</p>
           </div>
        )
      }

{
   cartCount>0 &&(
    <div> 
<b>Total: {"  "} {formattedTotalPrice} </b>
<button disabled={isRedirecting} onClick={onCheckOut}>   {isRedirecting ? "Redirecting.." :"Go to Checkout!"}</button>

    </div>
   )
}

    </div>
  )
}
