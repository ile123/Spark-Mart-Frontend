import styles from "./EditAddress.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Grid, Container, Paper, Box, TextField, Button, Avatar, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { changeUserAddress } from "../../../../services/user-Service";
import { getAddressById } from "../../../../services/address-Service";
import { Address } from "../../../../types/Address";
import { Errors } from "../../../../types/Errors";
import HomeIcon from '@mui/icons-material/Home';

export default function EditAddress() {
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

  async function formSubmit(data: any) {
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
            Change User Address
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

/**
 * <form onSubmit={handleSubmit(submitForm, handleError)}>
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
 */