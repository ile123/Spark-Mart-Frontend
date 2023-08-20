import styles from "./EditUser.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { getUserById, updateUser } from "../../../../services/user-Service";
import {
  Grid,
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import { User } from "../../../../types/User";
import { Errors } from "../../../../types/Errors";
import EditIcon from "@mui/icons-material/Edit";

export default function EditUser() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>([]);
  const [user, setUser] = useState<User>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  async function formSubmit(data: any) {
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
      <Container
        sx={{
          flexGrow: 1,
          padding: 3,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "15%",
          }}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(formSubmit, handleError)}
            sx={{ mt: 3 }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
                marginBottom: "1.5rem",
                marginLeft: "40%",
                width: "6rem",
                height: "6rem",
              }}
            >
              <EditIcon
                sx={{
                  width: "5.5rem",
                  height: "5.5rem",
                }}
              />
            </Avatar>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Edit User Profile
            </Typography>
            <Paper
              sx={{
                width: "36rem",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="First Name"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginLeft: "1rem",
                    }}
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
                    label="Last Name"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      paddingRight: "1rem",
                    }}
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
                    label="Phone Number"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginLeft: "1rem",
                      marginBottom: "1rem",
                    }}
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
                  ></TextField>
                </Grid>
              </Grid>
            </Paper>
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: "0.2%",
              }}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid item>
                <Link to="/changePassword" state={{ userId: userId }}>
                  <Button
                    variant="outlined"
                    sx={{
                      marginRight: "14rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    Change Password
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    paddingTop: "0.5rem",
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
