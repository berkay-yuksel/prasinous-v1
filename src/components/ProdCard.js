
import Image from "next/image";
import Link from "next/link";
import cardstyles from "src/styles/Card.module.css";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import toast from "react-hot-toast";

function ProdCard({ product, index }) {
 
  const { addItem } = useShoppingCart();
  function onAddToCart(event) {
    event.preventDefault();
    const id= toast.loading("Adding 1 item..");
    addItem(product);
    toast.success(`${product.name} added`,{id});
  }
  return (
    <Link href={`/products/${product.id}`}>
      <div className={cardstyles.card}>
        <Image
          priority={index === 0}
          src={product.image}
          width={125}
          height={125}
          alt="Picture of the author"
        />
        <p>{product.name}</p>
        <p><b> 
          {formatCurrencyString({
            currency: product.currency,
            value: product.price,
          })}
          </b>
        </p>
        <button onClick={onAddToCart}> Add to cart </button>
        <button> <Link href={`/products/${product.id}`}> Buy now  </Link></button>
      </div>
    </Link>
  );
}

export default ProdCard;
