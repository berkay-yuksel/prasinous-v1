import { stripe } from "src/utils/stripe";
import pagestyles from "src/styles/Page.module.css";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
export default function ProdPage({ product }) {

  const { addItem } = useShoppingCart();
  function onAddToCart(event) {
    event.preventDefault();
    const id= toast.loading(`Adding ${count} item${count>1?"s":""}..`);
    addItem(product, {count});
    toast.success(` ${count} ${product.name} added`,{id});
  }

  const [count,setCount]= useState(1);
  return (
    <div className={pagestyles.pcontainer}>
      <div>  <Image
     
          src={product.image}
          width={350}
          height={350}
          alt="Picture of the author"
        /></div>
      <div className={pagestyles.info_container}>

        <div>
          <h3>{product.name}</h3>
          <span> ✓ In stock</span>
        </div>
        <div>
          <h3>Unit Price:</h3>
          <span> {formatCurrencyString({
            currency: product.currency,
            value: product.price,
          })}</span>
        </div>
        <div>
          <h3>Total Price:</h3>
          <span> {formatCurrencyString({
            currency: product.currency,
            value: product.price*count,
          })}</span>
        </div>
        <div className={pagestyles.last}>
          <h3>Quantity</h3>
          <span>  <button disabled={count-1<1} onClick={()=>setCount(count-1)}>-</button>{`  ${count}  `}<button onClick={()=>setCount(count+1)}>+</button></span>
        </div>
        <button onClick={onAddToCart}>Add to cart</button>
   
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const inventory = await stripe.products.list();
  const paths = inventory.data.map((product) => ({
    params: { id: product.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ params }) => {
  const inventory = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = inventory.data.map((product) => {
    const price = product.default_price;
    return {
      currency: price.currency,
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      image: product.images[0],
    };
  });
  const product = products.find((product) => product.id === params.id);
  return {
    props: {
      product,
    },
    revalidate: 60 * 60,
  };
};
