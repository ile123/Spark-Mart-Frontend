import { Card } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import Button from "../../UI/Button/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC, faCog, faL } from "@fortawesome/free-solid-svg-icons";
import { userLogin } from "../../../auth/authActions";
import { Container, Box, Avatar, Typography, Grid, TextField, Select, MenuItem } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginPage() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const { loading, userInfo, error } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(userInfo) !== "{}") navigate("/");
  }, [navigate, userInfo]);

  const submitForm = async(data: any) => {
    //@ts-ignore
    await dispatch(userLogin(data));
    while(loading) {
      continue;
    }
    if(JSON.stringify(userInfo) != '{}') {
      navigate("/");
    }
    else {
      setFormErrors(["ERROR: Login failed!"]);
      setShowErrorModal(true);
      return;
    }
  };

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm, errorHandler)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              {...register("email", {
                required: {
                  value: true,
                  message: "ERROR: Email is required!",
                },
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "ERROR: Password is required!",
                },
              })}
            />
            <Button type="submit" style={styles.button}>
              {!loading ? "Sign In" : <FontAwesomeIcon icon={faCog} size="xl" />}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" id={styles.registerLink}>Dont have an account? Register here</Link> 
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

/**
 * <form onSubmit={handleSubmit(submitForm, handleError)}>
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
          <Card.Footer id={styles.footer}>
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
 */