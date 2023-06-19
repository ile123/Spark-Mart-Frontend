import styles from "./EditAddress.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { changeUserAddress } from "../../../../services/user-Service";
import { getAddressById } from "../../../../services/address-Service";
import Button from "../../../UI/Button/Button";
import { Address } from "../../../../types/Address";
import { Errors } from "../../../../types/Errors";

export default function EditUser() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [address, setAddress] = useState<Address>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  async function submitForm(data: any) {
    const submitData: Address = {
      id: addressId,
      streetAddress: data.streetAddress,
      city: data.city,
      postalCode: data.postalCode,
      province: data.province,
      country: data.country,
    };
    changeUserAddress(userId, submitData);
    navigate("/");
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

  const navigate = useNavigate();
  const {
    state: { userId, addressId },
  } = useLocation();

  useEffect(() => {
    //@ts-ignore
    getAddressById(addressId).then((result: any) => setAddress(result.data));
  }, []);

  useEffect(() => {
    if (address) {
      setValue("streetAddress", address.streetAddress);
      setValue("city", address.city);
      setValue("postalCode", address.postalCode);
      setValue("province", address.province);
      setValue("country", address.country);
    }
  }, [address]);

  if (JSON.stringify(address) === "{}") {
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
          <Card.Header id={styles.header}>Change Address</Card.Header>
          <Card.Body>
            <div className={styles.grid}>
              <div className={styles.item}>
                <h3 className={styles.label}>Street Address: </h3>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={address?.streetAddress}
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
                  defaultValue={address?.city}
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
                  defaultValue={address?.postalCode}
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
                  defaultValue={address?.province}
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
                  defaultValue={address?.country}
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
