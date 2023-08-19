import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Grid, Container, Paper, Box, TextField, Avatar, Typography, Button } from "@mui/material";
import { createNewAddress } from "../../../../services/address-Service";
import { Errors } from "../../../../types/Errors";
import HomeIcon from '@mui/icons-material/Home';

export default function AddAddress() {

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  async function formSubmit(data: any) {
    const submitData = {
      streetAddress: data.streetAddress,
      city: data.city,
      postalCode: data.postalCode,
      province: data.province,
      country: data.country,
    };
    createNewAddress(submitData);
    setTimeout(() => {
      navigate("/addresses");
    }, 1200);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginBottom: "1.5rem", marginLeft: "40%", width: "6rem",
              height: "6rem" }}>
            <HomeIcon sx={{
              width: "5.5rem",
              height: "5.5rem",
            }}/>
          </Avatar>
          <Typography variant="h4" sx={{
            marginBottom: "2rem",
            textAlign: "center"
          }}>
            Add New Address
          </Typography>
          <Paper sx={{
            width: "36rem"
          }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Street Address"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginLeft: "1rem",
                    }}
                    {...register("streetAddress", {
                      required: {
                        value: true,
                        message: "ERROR: Street Address cannot be empty!",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="City"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginLeft: "1rem",
                      marginBottom: "1rem"
                    }}
                    {...register("city", {
                      required: {
                        value: true,
                        message: "ERROR: City cannot be empty!",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    label="Postal Code"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginLeft: "1rem",
                      marginBottom: "1rem"
                    }}
                    {...register("postalCode", {
                      required: {
                        value: true,
                        message: "ERROR: Postal code cannot be empty!",
                      },
                    })}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    label="Province"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginLeft: "1rem",
                      marginBottom: "1rem"
                    }}
                    {...register("province", {
                      required: {
                        value: true,
                        message: "ERROR: Province is required!",
                      },
                    })}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    label="Country"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginLeft: "1rem",
                      marginBottom: "1rem"
                    }}
                    {...register("country", {
                      required: {
                        value: true,
                        message: "ERROR: Country is required!",
                      },
                    })}
                    >
                    </TextField>
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
                <Button variant="outlined"
                type="submit"
                sx={{
                  paddingTop: "0.5rem"
                }}>
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