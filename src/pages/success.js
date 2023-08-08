import useSWR from "swr"
import { useRouter } from "next/router";
import axios from "axios";
import { useShoppingCart } from "use-shopping-cart";
export default function SuccessPage() {
const {clearCart}=useShoppingCart();
const router= useRouter()
const sessionId= router.query.session_id
const {data,error}= useSWR(`api/checkout-sessions/${sessionId}`,url=>axios.get(url).then(res=>res.data),
{
    onSuccess(){
clearCart();
    }
});

const email= data?.customer_details.email

  return (
    <div>
    {error ? <div>Sorry, something went wrong!</div> : !data ? <div>Loading...</div> : <div>Thanks for your order!<p>Check your email ({email}) for your invoice!</p></div>}
 </div>
  )
}
