import AppLayout from "src/components/Layout";
import  { Toaster } from "react-hot-toast";
import { CartProvider } from "use-shopping-cart";
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
import "src/styles/global.css"
export default function App({ Component, pageProps }) {
  return (
    <CartProvider stripe={stripeKey} cartMode="checkout-session" currency="USD">
      <AppLayout>
        <Toaster />
        <Component {...pageProps} />
      </AppLayout>
    </CartProvider>
  );
}
