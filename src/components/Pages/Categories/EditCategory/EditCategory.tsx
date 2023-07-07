import { Card } from "react-bootstrap";
import styles from "./EditCategory.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Errors } from "../../../../types/Errors";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import Button from "../../../UI/Button/Button";
import { getCategoryById, updateCategory } from "../../../../services/category-Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export default function EditCategory() {
  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [category, setCategory] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  async function submitForm(data: any) {
    if(data.image[0].size > 1048576) {
      setFormErrors(["ERROR: Maximum image size exceeded(1MB)!"]);
      setShowErrorModal(true);
      return;
    }
    const params = {
        id: categoryId,
        name: data.name,
        description: data.description,
        image: data.image[0]
    }
    updateCategory(params);
    navigate("/adminCategories");
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

  const {
    state: { categoryId },
  } = useLocation();

  useEffect(() => {
    getCategoryById(categoryId).then((result: any) => {
        setCategory(result.data);
    });
  }, []);

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [category]);

  if (JSON.stringify(category) === "{}") {
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );
  }

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      <form onSubmit={handleSubmit(submitForm, handleError)}>
        <Card id={styles.card}>
          <Card.Header id={styles.header}>Add New Category</Card.Header>
          <Card.Body>
            <h3 className={styles.label}>Name: </h3>
            <input type="text" className={styles.input} {...register("name", {
                required: {
                    value: true,
                    message: "ERROR: Name is required!"
                }
            })}/>
            <h3 id={styles.descriptionCategory}>Description: </h3>
            <input type="text" className={styles.input} {...register("description", {
                required: {
                    value: true,
                    message: "ERROR: Name is required!"
                }
            })}/>
            <h3 className={styles.label}>Photo: </h3>
            <input type="file" accept="image/*" className={styles.input} {...register("image", {
                required: {
                    value: true,
                    message: "ERROR: Photo is required!"
                },
            })}/>
          </Card.Body>
          <Card.Footer id={styles.footer}>
            <Button style={styles.button} type={"submit"}>
              Submit
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </>
  );
}
