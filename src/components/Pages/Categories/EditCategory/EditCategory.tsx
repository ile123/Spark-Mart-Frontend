import styles from "./EditCategory.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Errors } from "../../../../types/Errors";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { getCategoryById, updateCategory } from "../../../../services/category-Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
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
  TextareaAutosize,
} from "@mui/material";

export default function EditCategory() {
  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [category, setCategory] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  async function formSubmit(data: any) {
    if (data.image[0] === undefined) {
      const params = {
        id: categoryId,
        name: data.name,
        description: data.description
      };
      updateCategory(params);
      setTimeout(() => {
        navigate("/adminCategories");
      }, 1200);
    } else {
      if (data.image[0].size > 1048576) {
        setFormErrors(["ERROR: Maximum image size exceeded(1MB)!"]);
        setShowErrorModal(true);
        return;
      }
      const params = {
        id: categoryId,
        name: data.name,
        description: data.description,
        image: data.image[0],
      };
      updateCategory(params);
      setTimeout(() => {
        navigate("/adminCategories");
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
    state: { categoryId },
  } = useLocation();

  useEffect(() => {
    getCategoryById(categoryId).then((result: any) => {
        setCategory(result.data);
    });
  }, []);

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [category]);

  if (JSON.stringify(category) === "{}") {
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
                marginLeft: "37%",
                width: "6rem",
                height: "6rem",
              }}
            >
              <AddBoxIcon
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
              Add New Category
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
                      marginBottom: "1rem",
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
                <Grid
                  container
                  spacing={2}
                  sx={{
                    marginBottom: "1rem"
                  }}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid item>
                    <TextareaAutosize
                      placeholder="Enter description here...."
                      {...register("description", {
                        required: {
                            value: true,
                            message: "ERROR: Description is required!"
                        }
                    })}
                    />
                  </Grid>
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