import { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductById } from "../../../../services/product-Service";
import { Product } from "../../../../types/Product";
import CartProductItem from "../../../UI/Items/CartProductItem/CartProductItem";
import { Card } from "react-bootstrap";
import cardValidator from "stripe-card-validator";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Errors } from "../../../../types/Errors";
import { useForm } from "react-hook-form";
import Button from "../../../UI/Button/Button";
import { purchaseProducts } from "../../../../services/customer-Service";

export default function ShoppingCart() {
  const { cart } = useSelector((state: any) => state.customer);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [noProductsFound, setNoProductsFound] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  async function submitForm(data: any) {    
    purchaseProducts({userId: userInfo.userId, products: cart });
  }

  const removeFromCartHandler = async () => {
    let total = 0;
    if (Object.keys(cart).length === 0) {
      setNoProductsFound(true);
    } else {
      const idArray: any[] = [];
      Object.keys(cart).map((key: any) => {
        idArray.push(key);
      });
      getData(idArray)
        .then((result: any) => {
          setProductsInCart(result);
          result.forEach((product: Product) => {
            total += product.price;
          });
          setTotalPrice(total);
          setNoProductsFound(false);
        })
        .catch((error: any) => console.log(error));
    }
  };

  const getData = async (idArray: any) => {
    try {
      const productPromises = idArray.map(async (productId: any) => {
        const response = await getProductById(productId);
        return response.data;
      });
      const products = await Promise.all(productPromises);
      return products;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleError = (errors: any) => {
    const errorsArray: Errors = [];
    {
      Object.values(errors).map((e: any) => {
        errorsArray.push(e.message);
      });
    }
    setFormErrors(errorsArray);
    setShowErrorModal(true);
  };

  const errorHandler = () => {
    setFormErrors([]);
    setShowErrorModal(false);
  };

  useEffect(() => {
    let total = 0;
    if (Object.keys(cart).length === 0) {
      setNoProductsFound(true);
    } else {
      const idArray: any[] = [];
      Object.keys(cart).map((key: any) => {
        idArray.push(key);
      });
      getData(idArray)
        .then((result: any) => {
          setProductsInCart(result);
          result.forEach((product: Product) => {
            total += product.price;
          });
          setTotalPrice(total);
          if (idArray.length === 0) {
            setNoProductsFound(true);
          } else {
            setNoProductsFound(false);
          }
        })
        .catch((error: any) => console.log(error));
    }
  }, []);

  if (noProductsFound) {
    <h3>No Products found!</h3>;
  } else {
    return (
      <>
        {showErrorModal && (
          <ErrorModal errors={formErrors} onConfirm={errorHandler} />
        )}
        <div id={styles.page}>
          <h1>Products</h1>
          {!noProductsFound &&
            productsInCart.map((item: Product, index: number) => {
              return (
                <CartProductItem
                  key={index}
                  id={item.id}
                  userId={userInfo.userId}
                  name={item.name}
                  amount={cart[item.id]}
                  price={item.price}
                  imageName={item.picture}
                  onRemoveFromCart={removeFromCartHandler}
                />
              );
            })}
          <form onSubmit={handleSubmit(submitForm, handleError)}>
            <Card id={styles.paymentCard}>
              <Card.Title id={styles.paymentTitle}>Payment</Card.Title>
              <div className={styles.paymentGrid}>
                <div className={styles.paymentGridItem}>
                  <h3>Number</h3>
                  <input
                    type="text"
                    {...register("cardNumber", {
                      required: {
                        value: true,
                        message: "ERROR: Card Number is required!",
                      },
                      pattern: {
                        value: /^[0-9]{9,14}$/g,
                        message: "ERROR: Invalid Card Number!",
                      },
                    })}
                  />
                </div>
                <div className={styles.paymentGridItem}>
                  <h3>CVC</h3>
                  <input
                    type="number"
                    min={100}
                    max={999}
                    {...register("cvc", {
                      required: {
                        value: true,
                        message: "ERROR: CVC is required!",
                      },
                    })}
                  />
                </div>
              </div>
              <div className={styles.paymentGrid}>
                <div className={styles.paymentGridItem}>
                  <h3>Month</h3>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    {...register("month", {
                      required: {
                        value: true,
                        message: "ERROR: Card Month is required!",
                      },
                    })}
                  />
                </div>
                <div className={styles.paymentGridItem}>
                  <h3>Year</h3>
                  <input
                    type="number"
                    min={1970}
                    {...register("year", {
                      required: {
                        value: true,
                        message: "ERROR: Year is required!",
                      }
                    })}
                  />
                </div>
              </div>
              <Button style={styles.submitButton} type={"submit"}>Submit</Button>
            </Card>
          </form>
        </div>
      </>
    );
  }
}
