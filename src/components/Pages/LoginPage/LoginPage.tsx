import { Card } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import Button from "../../UI/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faL } from "@fortawesome/free-solid-svg-icons";
import { userLogin } from "../../../auth/authActions";

export default function LoginPage() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  let counter = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data: any) => {
    //@ts-ignore
    dispatch(userLogin(data));
    navigate("/");
  };

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

  const { loading, userInfo, success } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(userInfo) !== "{}") navigate("/");
  }, [navigate, userInfo]);

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      <form onSubmit={handleSubmit(submitForm, handleError)}>
        <Card id={styles.card}>
          <Card.Header id={styles.pageName}>LOGIN</Card.Header>
          <Card.Body id={styles.inputs}>
            <h3 className={styles.label}>Email</h3>
            <input
              type="email"
              placeholder="Enter email..."
              className={styles.input}
              autoComplete={"off"}
              {...register("email", {
                required: {
                  value: true,
                  message: "ERROR: Email is required!",
                },
              })}
            />
            <h3 className={styles.label}>Password</h3>
            <input
              type="password"
              placeholder="Enter password..."
              className={styles.input}
              {...register("password", {
                required: {
                  value: true,
                  message: "ERROR: Password is required!",
                },
              })}
            />
            <br />
          </Card.Body>
          <Card.Footer>
            <Button style={styles.button} type={"submit"}>
              {loading ? (
                <FontAwesomeIcon icon={faCog} pulse size="lg" />
              ) : (
                "Login"
              )}
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </>
  );
}
