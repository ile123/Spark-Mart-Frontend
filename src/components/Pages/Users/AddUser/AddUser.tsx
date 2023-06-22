import { Card } from "react-bootstrap";
import styles from "./AddUser.module.css";
import Button from "../../../UI/Button/Button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { registerUser } from "../../../../auth/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddUser() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    state: { userType },
  } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function submitForm(data: any) {
    const submitData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email.toLowerCase(),
      password: data.password,
      gender: data.gender,
      role: userType,
    };
    await axios
      .post("http://localhost:8080/spark-mart/api/auth/email-exists", {
        email: data.email,
      })
      .then((response: any) => {
        if (response.data === true) {
          setFormErrors(["ERROR: Email already in use!"]);
          setShowErrorModal(true);
        } else {
          //@ts-ignore
          dispatch(registerUser(submitData));
          navigate("/users/" + userType);
        }
      })
      .catch((error: any) => console.log(error));
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

  const { loading } = useSelector((state: any) => state.auth);

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      <form onSubmit={handleSubmit(submitForm, handleError)}>
        <Card id={styles.card}>
          <Card.Header id={styles.pageName}>REGISTER</Card.Header>
          <Card.Body id={styles.inputs}>
            <h3 className={styles.label}>Email</h3>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter email...."
              autoComplete={"off"}
              {...register("email", {
                required: {
                  value: true,
                  message: "ERROR: Email is required!",
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "ERROR: Invalid email!",
                },
              })}
            />
            <div className="row">
              <div className="col">
                <h3 className={styles.label}>Phone Number</h3>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter phone number..."
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "ERROR: Phone Number is required!",
                    },
                    pattern: {
                      value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                      message: "ERROR: Invalid phone number!",
                    },
                  })}
                />
              </div>
              <div className="col">
                <h3 className={styles.label}>Gender</h3>
                <select
                  id={styles.genderSelect}
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "ERROR: Choose the gender!",
                    },
                    pattern: {
                      value: /^(male|female)$/i,
                      message: "ERROR: Gender is invalid!",
                    },
                  })}
                >
                  <option defaultValue={""}>Please select an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3 className={styles.label}>First Name</h3>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter first name..."
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "ERROR: You must specify your first name!",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "ERROR: Invalid first name!",
                    },
                  })}
                />
              </div>
              <div className="col">
                <h3 className={styles.label}>Last Name</h3>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter last name..."
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "ERROR: You must specify your last name!",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "ERROR: Invalid last name!",
                    },
                  })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3 className={styles.label}>Password</h3>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Enter password..."
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
              </div>
              <div className="col">
                <h3 className={styles.label}>Repeat Password</h3>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Repeat password..."
                  {...register("repeatPassword", {
                    validate: (match) => {
                      const password = getValues("password");
                      return (
                        match === password || "ERROR: Passwords should match!"
                      );
                    },
                    required: {
                      value: true,
                      message: "ERROR: Repeat password is required!",
                    },
                  })}
                />
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button style={styles.button} type={"submit"}>
              {loading ? (
                <FontAwesomeIcon icon={faCog} pulse size="lg" />
              ) : (
                "Register"
              )}
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </>
  );
}
