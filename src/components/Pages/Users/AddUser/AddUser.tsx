import styles from "./AddUser.module.css";
import Button from "../../../UI/Button/Button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { registerUser } from "../../../../auth/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

export default function AddUser() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    state: { userType },
  } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function formSubmit(data: any) {
    const submitData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email.toLowerCase(),
      password: data.password,
      gender: gender,
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
          setTimeout(() => {
            navigate("/users/" + userType);
          }, 1200);
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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <BadgeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(formSubmit, handleError)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  autoComplete="off"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "ERROR: First Name is required!",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "ERROR: Invalid first name!",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  autoComplete="off"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  label="Phone Number"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  displayEmpty
                  required
                  fullWidth
                  value={gender}
                  onChange={(e: any) => setGender(e.target.value)}
                >
                  <MenuItem disabled value="">
                    Please Select a Gender
                  </MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  type="email"
                  label="Email Address"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  label="Password"
                  type="password"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  label="Repeat Password"
                  type="password"
                  {...register("repeatedPassword", {
                    required: {
                      value: true,
                      message: "ERROR: Repeated Password is required!",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message:
                        "ERROR: Invalid password(It needs to contain 1 upper case letter, 1 lower case letter and a number, also min. lenght is 8)!",
                    },
                  })}
                />
              </Grid>
            </Grid>
            <Button type="submit" style={styles.button}>
              {!loading ? (
                "Add User"
              ) : (
                <FontAwesomeIcon icon={faCog} size="xl" />
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
