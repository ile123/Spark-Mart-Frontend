import { Card } from "react-bootstrap";
import { getAllBrands } from "../../../../services/brand-Service";
import { getAllCategories } from "../../../../services/category-Service";
import styles from "./EditProduct.module.css";
import { useEffect, useState } from "react";
import { DisplayBrand } from "../../../../types/DisplayBrand";
import { DisplayCategory } from "../../../../types/DisplayCategory";
import Button from "../../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan, faCog } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Errors } from "../../../../types/Errors";
import { updateProduct, getProductById } from "../../../../services/product-Service";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Product } from "../../../../types/Product";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [brands, setBrands] = useState<DisplayBrand[]>([{}]);
  const [categories, setCategories] = useState<DisplayCategory[]>([{}]);
  const [product, setProduct] = useState<Product>({});
  const [nameSpecification, setNameSpecification] = useState("");
  const [valueSpecification, setValueSpecification] = useState("");
  const [specifications, setSpecifications] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("shortDescription", product.shortDescription);//popravi default slecet na brand i category
      setValue("price", product.price);
      setValue("quantity", product.quantity);
    }
  }, [product]);

  async function submitForm(data: any) {
    if (data.image[0].size > 512000) {
      setFormErrors(["ERROR: Maximum image size exceeded(500kb)!"]);
      setShowErrorModal(true);
      return;
    }
    if (JSON.stringify(specifications) === "{}") {
      setFormErrors(["ERROR: Specifications cannot be empty!"]);
      setShowErrorModal(true);
      return;
    }
    const params = {
      id: id,
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      specifications: JSON.stringify(specifications),
      price: data.price,
      image: data.image[0],
      quantity: data.quantity,
      brand: data.brand,
      category: data.category,
    };
    updateProduct(params);
    navigate("/adminProducts");
  }

  const handleNameSpecificationChange = (event: any) => {
    setNameSpecification(event.target.value);
  };

  const handleValueSpecificationChange = (event: any) => {
    setValueSpecification(event.target.value);
  };

  const addToSpecifications = () => {
    if (nameSpecification.trim() === "") {
      setFormErrors(["ERROR: Name of specification can not be empty!"]);
      return;
    }
    if (valueSpecification.trim() === "") {
      setFormErrors(["ERROR: Value of specification can not be empty!"]);
      return;
    }
    setSpecifications({
      ...specifications,
      [nameSpecification]: valueSpecification,
    });
  };

  const deleteSpecificationField = (key: any) => {
    delete specifications[key];
  }

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
    getProductById(id)
      .then((result: any) => { setProduct(result.data); setSpecifications(JSON.parse(result.data.specifications))})
      .catch((error: any) => console.log(error));
    getAllBrands(0, 1000, "name", "asc", "")
      .then((result: any) => setBrands(result.data.content))
      .catch((error: any) => console.log(error));
    getAllCategories(0, 1000, "name", "asc", "")
      .then((result: any) => setCategories(result.data.content))
      .catch((error: any) => console.log(error));
  }, []);

  if (JSON.stringify(product) === "{}") {
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );
  }

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      {(brands.length !== 0 && categories.length !== 0 && product) ? (
        <form onSubmit={handleSubmit(submitForm, handleError)}>
          <Card id={styles.card}>
            <Card.Header id={styles.header}>
              <h3>Update Product</h3>
            </Card.Header>
            <Card.Body>
              <div id={styles.left}>
                <div className={styles.grid}>
                  <div className={styles.item}>
                    <h3>Name</h3>
                    <input
                      defaultValue={product.name}
                      type="text"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "ERROR: Name is required!",
                        },
                      })}
                    />
                  </div>
                  <div className={styles.item}>
                    <h3>Description</h3>
                    <input
                      defaultValue={product.description}
                      type="text"
                      {...register("description", {
                        required: {
                          value: true,
                          message: "ERROR: Description is required!",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className={styles.grid}>
                  <div className={styles.item}>
                    <h3>Short Description</h3>
                    <input
                      defaultValue={product.shortDescription}
                      type="text"
                      {...register("shortDescription", {
                        required: {
                          value: true,
                          message: "ERROR: Short Description is required!",
                        },
                      })}
                    />
                  </div>
                  <div className={styles.item}>
                    <h3>Price</h3>
                    <input
                      defaultValue={product.price}
                      type="number"
                      min={0.01}
                      step={.01}
                      {...register("price", {
                        required: {
                          value: true,
                          message: "ERROR: Price is required!",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className={styles.grid}>
                  <div className={styles.item}>
                    <h3>Quantity</h3>
                    <input
                      defaultValue={product.quantity}
                      type="number"
                      {...register("quantity", {
                        required: {
                          value: true,
                          message: "ERROR: Quantity is required!",
                        },
                      })}
                    />
                  </div>
                  <div className={styles.item}>
                    <h3>Image</h3>
                    <input
                      type="file"
                      accept="image/*"
                      className={styles.input}
                      {...register("image", {
                        required: {
                          value: true,
                          message: "ERROR: Picture is required!",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className={styles.grid}>
                  <div className={styles.item}>
                    <h3>Brands</h3>
                    <select defaultValue={product.brand}
                      size={3}
                      {...register("brand", {
                        required: {
                          value: true,
                          message: "ERROR: Brand is required!",
                        },
                      })}
                    >
                      {brands.map((brand: any, index: number) => (
                        <option key={index} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.item}>
                    <h3 id={styles.categoryLabel}>Categories</h3>
                    <select defaultValue={product.category}
                      size={3}
                      id={styles.categoryInput}
                      {...register("category", {
                        required: {
                          value: true,
                          message: "ERROR: Category is required!",
                        },
                      })}
                    >
                      {categories.map((category: any, index: number) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div id={styles.right}>
                <h3>Specifications</h3>
                <div id={styles.item_list}>
                  <ul>
                    {Object.keys(specifications).map((key: any, index: any) => (
                      <li className={styles.grid} key={index}>
                        <h5 className={styles.item}>{key}</h5>
                        <h5 className={styles.item}>{specifications[key]}</h5>
                        <Button style={styles.removeSpecificationButton} onClick={() => deleteSpecificationField(key)}>
                          <FontAwesomeIcon icon={faTrashCan} size="xl"/>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.grid}>
                  <div className={styles.item}>
                    <h3>Name</h3>
                    <input
                      type="text"
                      id={styles.specificationName}
                      onChange={handleNameSpecificationChange}
                    />
                  </div>
                  <div className={styles.item}>
                    <h3>Value</h3>
                    <input
                      type="text"
                      onChange={handleValueSpecificationChange}
                    />
                  </div>
                  <div className={styles.item}>
                    <Button
                      style={styles.circleButton}
                      onClick={addToSpecifications}
                    >
                      <FontAwesomeIcon icon={faCirclePlus} size="2xl" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button style={styles.button} type={"submit"}>
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </form>
      ) : (
        <h3>Loading....</h3>
      )}
    </>
  );
}
