import styles from './AddAddress.module.css'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Card } from "react-bootstrap";
import { createNewAddress } from "../../../../services/address-Service";
import Button from "../../../UI/Button/Button";
import { Errors } from "../../../../types/Errors";

export default function AddAddress() {

  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  async function submitForm(data: any) {
    const submitData = {
      streetAddress: data.streetAddress,
      city: data.city,
      postalCode: data.postalCode,
      province: data.province,
      country: data.country,
    };
    createNewAddress(submitData);
    navigate("/addresses");
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

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      <form onSubmit={handleSubmit(submitForm, handleError)}>
        <Card id={styles.card}>
          <Card.Header id={styles.header}>Add New Address</Card.Header>
          <Card.Body>
            <div className={styles.grid}>
              <div className={styles.item}>
                <h3 className={styles.label}>Street Address: </h3>
                <input
                  type="text"
                  className={styles.input}
                  {...register("streetAddress", {
                    required: {
                      value: true,
                      message: "ERROR: Street Address cannot be empty!",
                    },
                  })}
                />
              </div>
              <div className={styles.item}>
                <h3 className={styles.label}>City: </h3>
                <input
                  type="text"
                  className={styles.input}
                  {...register("city", {
                    required: {
                      value: true,
                      message: "ERROR: City cannot be empty!",
                    },
                  })}
                />
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.item}>
                <h3 className={styles.label}>Postal Code: </h3>
                <input
                  type="text"
                  className={styles.input}
                  {...register("postalCode", {
                    required: {
                      value: true,
                      message: "ERROR: Postal code cannot be empty!",
                    },
                  })}
                />
              </div>
              <div className={styles.item}>
                <h3 className={styles.label}>Province: </h3>
                <input
                  type="text"
                  className={styles.input}
                  {...register("province", {
                    required: {
                      value: true,
                      message: "ERROR: Province is required!",
                    },
                  })}
                />
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.item}>
                <h3>Country: </h3>
                <input
                  type="text"
                  className={styles.input}
                  {...register("country", {
                    required: {
                      value: true,
                      message: "ERROR: Country is required!",
                    },
                  })}
                />
              </div>
            </div>
          </Card.Body>
          <Card.Footer id={styles.footer}>
            <Button style={styles.button} type={"submit"}>
              Save Changes
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </>
  );
}