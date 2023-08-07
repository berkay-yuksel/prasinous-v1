import Link from "next/link";
import Image from "next/image";

import cartitemstyles from "src/styles/CartItem.module.css";
import { useShoppingCart ,formatCurrencyString } from "use-shopping-cart";
export default function CartItem({ product }) {
  const { setItemQuantity, removeItem } = useShoppingCart();
  return (
    <div className={cartitemstyles.cart_item_contaier}>
      <div className={cartitemstyles.cart_name_and_pic_container}>
        <Image src={product.image} width={75} height={75} alt={product.name} />
        <Link href={`/products/${product.id}`}>{product.name}</Link>
      </div>

      <div className={cartitemstyles.cart_rest_container}>
        <div>
          <button
            disabled={product.quantity - 1 < 1}
            onClick={() => setItemQuantity(product.id, product.quantity - 1)}
          >
            -
          </button>
          {`  ${product.quantity}  `}
          <button
            onClick={() => setItemQuantity(product.id, product.quantity + 1)}
          >
            +
          </button>
        </div>
        <div>
          {" "}
          {formatCurrencyString({
            currency: "usd",
            value: product.price * product.quantity,
          })}
        </div>
        <div>
          <button onClick={() => removeItem(product.id)}>X</button>
        </div>
      </div>
    </div>
  );
}
