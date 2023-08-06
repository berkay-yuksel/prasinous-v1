import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Meta from "src/components/Meta";
export default function Layout({ children }) {
  return (
    <div>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
