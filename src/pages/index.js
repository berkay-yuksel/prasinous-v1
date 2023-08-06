import { stripe } from "src/utils/stripe";
import cardstyles from "src/styles/Card.module.css";
import ProdCard from "src/components/ProdCard";

export default function Home({ products }) {

  return (
    <div className={cardstyles.ccontainer}>
      {products.map((product,index) => (
      <ProdCard key={product.id} index={index} product={product}/>
      ))}
    </div>
    
  );
}

export const getStaticProps = async () => {
  const inventory = await stripe.products.list({
    limit: 10,
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
  return {
    props: {
      products,
    },
  };
};
