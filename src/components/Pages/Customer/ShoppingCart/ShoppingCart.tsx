import { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductById } from "../../../../services/product-Service";
import ProductCartItem from "../../../UI/Items/ProudctCartItem/ProductCartItem";
import { Product } from "../../../../types/Product";

export default function ShoppingCart() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const { cart, numberOfProducts } = useSelector(
    (state: any) => state.customer
  );
  const [products, setProducts] = useState<Product[]>();
  const [noProductsFound, setNoProductsFound] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  products?.forEach((product: Product) => {
    console.log(product.name);
  })

  console.log(cart);

  useEffect(() => {
    if (numberOfProducts !== 0) {
      const allProducts: Product[] = [];
      cart.forEach((cart: any) => {
        if (cart.userId === userInfo.userId) {
          getProductById(cart.productId)
            .then((result: any) => {
              allProducts.push(result.data);
            })
            .catch((error: any) => console.log(error));
          setNoProductsFound(false);
        }
      });
      setProducts(allProducts);
    }
  }, []);

  return (
    <>
      <div id={styles.page}>
        {noProductsFound ? (
          <h1 id={styles.noProductsInCart}>
            No products were added to the cart!
          </h1>
        ) : (
          <div>
            <h1>Products:</h1>
            <ul>
              {products?.map((product: Product, index: number) => (
                <li key={index}>{product.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
