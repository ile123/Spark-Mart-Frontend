import styles from "./EditUser.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { getUserById, updateUser } from "../../../../services/user-Service";
import Button from "../../../UI/Button/Button";
import { User } from "../../../../types/User";
import { Errors } from "../../../../types/Errors";

export default function EditUser() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>([]);
  const [user, setUser] = useState<User>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  async function submitForm(data: any) {
    const submitData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    };
    updateUser(userId, submitData);
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
    state: { userId },
  } = useLocation();

  useEffect(() => {
    //@ts-ignore
    getUserById(userId).then((result: any) => setUser(result.data));
  }, []);

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("phoneNumber", user.phoneNumber);
    }
  }, [user]);

  if (JSON.stringify(user) === "{}") {
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
          <Card.Header id={styles.header}>Edit User</Card.Header>
          <Card.Body>
            <div className={styles.grid}>
              <div className={styles.item}>
                <h3 className={styles.label}>First Name: </h3>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={user?.firstName}
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
              <div className={styles.item}>
                <h3 className={styles.label}>Last Name: </h3>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={user?.lastName}
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
            <div className={styles.grid}>
              <div className={styles.item}>
                <h3 className={styles.label}>Phone Number: </h3>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={user?.phoneNumber}
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
            </div>
          </Card.Body>
          <Card.Footer id={styles.footer}>
            <div className={styles.grid}>
              <div className={styles.footerItem}>
                <Link
                  to="/changePassword"
                  id={styles.changePassword}
                  state={{ userId: userId }}
                >
                  Change Password
                </Link>
              </div>
              <div className={styles.footerItem}>
                <Button style={styles.button} type={"submit"}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </form>
    </>
  );
}
