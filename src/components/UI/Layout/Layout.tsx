import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function Layout(props: any) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
