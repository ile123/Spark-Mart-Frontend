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
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { changeUserPassword } from "../../../services/user-Service";
import PasswordIcon from "@mui/icons-material/Password";

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
  } = useForm();
  const navigate = useNavigate();

  async function formSubmit(data: any) {
    if (data.password != data.repeatPassword) {
      setFormErrors(["ERROR: Password and Repeat Password do not match!"]);
      setShowErrorModal(true);
      return;
    }
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
              <PasswordIcon
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
              Change Password
            </Typography>
            <Paper
              sx={{
                width: "36rem",
              }}
            >
              <Grid
                container
                spacing={3}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item>
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
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    label="Repeat Password"
                    type="password"
                    sx={{
                      marginBottom: "1.5rem",
                    }}
                    {...register("repeatPassword", {
                      required: {
                        value: true,
                        message: "ERROR: Repeat Password is required!",
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
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    paddingTop: "0.5rem",
                    width: "8rem",
                    height: "3rem",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
