import styles from "./EditBrand.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Errors } from "../../../../types/Errors";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { getBrandById, updateBrand } from "../../../../services/brand-Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Brand } from "../../../../types/Brand";
import {
  Grid,
  Container,
  Paper,
  Box,
  TextField,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export default function EditBrand() {
  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [brand, setBrand] = useState<Brand>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  async function submitForm(data: any) {
    if (data.image[0] === undefined) {
      const params = {
        id: brandId,
        name: data.name,
      };
      updateBrand(params);
      setTimeout(() => {
        navigate("/adminBrands");
      }, 1200);
    } else {
      if (data.image[0].size > 1048576) {
        setFormErrors(["ERROR: Maximum image size exceeded(1MB)!"]);
        setShowErrorModal(true);
        return;
      }
      const params = {
        id: brandId,
        name: data.name,
        image: data.image[0],
      };
      updateBrand(params);
      setTimeout(() => {
        navigate("/adminBrands");
      }, 1200);
    }
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

  const {
    state: { brandId },
  } = useLocation();

  useEffect(() => {
    getBrandById(brandId).then((result: any) => {
      setBrand(result.data);
    });
  }, []);

  useEffect(() => {
    if (brand) {
      setValue("name", brand.name);
    }
  }, [brand]);

  if (JSON.stringify(brand) === "{}") {
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
            onSubmit={handleSubmit(submitForm, handleError)}
            sx={{ mt: 3 }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
                marginBottom: "1.5rem",
                marginLeft: "37%",
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
              Edit Brand
            </Typography>
            <Paper
              sx={{
                width: "22rem",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Name"
                    InputLabelProps={{ shrink: true }}
                    autoComplete="off"
                    sx={{
                      marginLeft: "1rem",
                      marginBottom: "0.5rem",
                    }}
                    {...register("name", {
                      required: {
                        value: true,
                        message: "ERROR: Name is required!",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      marginLeft: "3rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      {...register("image")}
                    />
                    <AddAPhotoIcon
                      sx={{
                        width: "3rem",
                        height: "3rem",
                      }}
                    />
                  </IconButton>
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
