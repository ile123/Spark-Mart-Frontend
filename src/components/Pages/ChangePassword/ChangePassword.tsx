import { Card } from "react-bootstrap";
import styles from "./ChangePassword.module.css";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { changeUserPassword } from "../../../services/user-Service";

export default function ChangePassword() {
  const {
    state: { userId },
  } = useLocation();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(data: any) {
    changeUserPassword(userId, data.password);
    navigate("/");
  }

  const handleError = (errors: any) => {
    const errorsArray: string[] = [];
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
          <Card.Footer>
            <h3 id={styles.header}>Change Password</h3>
          </Card.Footer>
          <Card.Body>
            <h3 className={styles.label}>Password: </h3>
            <input
              type="password"
              className={styles.input}
              {...register("password", {
                required: {
                  value: true,
                  message: "ERROR: Password is required!",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "ERROR: Invalid password(It needs to contain 1 upper case letter, 1 lower case letter and a number, also min. lenght is 8)!",
                },
              })}
            />
            <h3 className={styles.label}>Repeat Password: </h3>
            <input
              type="password"
              className={styles.input}
              {...register("repeatPassword", {
                validate: (match) => {
                  const password = getValues("password");
                  return match === password || "ERROR: Passwords should match!";
                },
                required: {
                  value: true,
                  message: "ERROR: Repeat password is required!",
                },
              })}
            />
          </Card.Body>
          <Card.Footer>
            <Button style={styles.button} type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </>
  );
}
