import Link from "next/link"
import Image from "next/image";
import cartitemstyles from "src/styles/CartItem.module.css"
export default  function CartItem({product}) {
  return (
    <div className={cartitemstyles.cart_item_contaier}>
 <Image
        
          src={product.image}
          width={75}
          height={75}
          alt="Picture of the author"
        />
        <Link href={`/products/${product.id}`}>{product.name}</Link>
    </div>
  )
}



