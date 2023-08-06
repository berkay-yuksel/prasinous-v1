import Image from 'next/image'
import {  useShoppingCart } from "use-shopping-cart";
import headerstyles from 'src/styles/Header.module.css'
import Link from "next/link";
function Header() {
 const {formattedTotalPrice,cartCount}= useShoppingCart()
  return (
  <div className={headerstyles.hcontainer}>
    <Link href={`/`}>  <span className={headerstyles.logo}>Prasi</span></Link>
    <Link href={`/cart`}>  <div className={headerstyles.hcontainer}> 
  
    <Image
    src="/cart.png"
    width={18}
    height={18}
    alt="cart"
  /> <p>{formattedTotalPrice} <span>({cartCount})</span></p> </div>
 </Link> 
  </div>
  
  )
}

export default Header