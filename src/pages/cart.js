import {  useShoppingCart } from "use-shopping-cart";
import products from "../../products";
import ProdCard from "src/components/ProdCard";
import CartItem from "src/components/CartItem"
export default function Cart() {
const {cartCount,clearCart,cartDetails,formattedTotalPrice} = useShoppingCart()

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
<button>Go to Checkout!</button>
    </div>
   )
}

    </div>
  )
}
