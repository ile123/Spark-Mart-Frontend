import { getAllBrands } from "../../../../services/brand-Service";
import { getAllCategories } from "../../../../services/category-Service";
import styles from "./EditProduct.module.css";
import { useEffect, useState } from "react";
import { DisplayBrand } from "../../../../types/DisplayBrand";
import { DisplayCategory } from "../../../../types/DisplayCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCog } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Errors } from "../../../../types/Errors";
import { updateProduct, getProductById } from "../../../../services/product-Service";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Product } from "../../../../types/Product";
import { useParams } from "react-router-dom";
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
  IconButton,
  TextareaAutosize,
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
} from "@mui/material";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [brands, setBrands] = useState<DisplayBrand[]>([]);
  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const [product, setProduct] = useState<Product>();
  const [nameSpecification, setNameSpecification] = useState("");
  const [valueSpecification, setValueSpecification] = useState("");
  const [specifications, setSpecifications] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("shortDescription", product.shortDescription);
      setValue("price", product.price);
      setValue("quantity", product.quantity);
      setValue("brand", product.brand);
      setValue("category", product.category);
    }
  }, [product]);

  async function formSubmit(data: any) {
    if (data.image[0].size > 512000) {
      setFormErrors(["ERROR: Maximum image size exceeded(500kb)!"]);
      setShowErrorModal(true);
      return;
    }
    if (JSON.stringify(specifications) === "{}") {
      setFormErrors(["ERROR: Specifications cannot be empty!"]);
      setShowErrorModal(true);
      return;
    }
    const params = {
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      specifications: JSON.stringify(specifications),
      price: data.price,
      image: data.image[0],
      quantity: data.quantity,
      brand: brand,
      category: category,
    };
    updateProduct(params);
    setTimeout(() => {
      navigate("/adminProducts");
    }, 1200)
  }

  const handleNameSpecificationChange = (event: any) => {
    setNameSpecification(event.target.value);
  };

  const handleValueSpecificationChange = (event: any) => {
    setValueSpecification(event.target.value);
  };

  const addToSpecifications = () => {
    if (nameSpecification.trim() === "") {
      setFormErrors(["ERROR: Name of specification can not be empty!"]);
      return;
    }
    if (valueSpecification.trim() === "") {
      setFormErrors(["ERROR: Value of specification can not be empty!"]);
      return;
    }
    setSpecifications({
      ...specifications,
      [nameSpecification]: valueSpecification,
    });
  };

  const deleteSpecificationField = (key: any) => {
    setLoading(true);
    delete specifications[key];
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

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

  useEffect(() => {
    getProductById(id)
      .then((result: any) => {
        setSpecifications(JSON.parse(result.data.specifications));
        setProduct(result.data);
      })
      .catch(() => setErrorLoading(true));
    getAllBrands(0, 1000, "name", "asc", "")
      .then((result: any) => {
        if (result.data.numberOfElements === 0) {
          setErrorLoading(true);
          setLoading(false);
          return;
        } else {
          setBrands(result.data.content);
        }
      })
      .catch((error: any) => console.log(error));
    getAllCategories(0, 1000, "name", "asc", "")
      .then((result: any) => {
        if (result.data.numberOfElements === 0) {
          setErrorLoading(true);
        } else {
          setCategories(result.data.content);
        }
        setLoading(false);
      })
      .catch((error: any) => console.log(error));
  }, []);

  if (loading)
  return (
    <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
  );

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      {!errorLoading ? (
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
              marginTop: "5%",
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
                  marginLeft: "42%",
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
                Add New Product
              </Typography>
              <Paper
                sx={{
                  height: "42rem",
                  width: "40rem",
                }}
              >
                <Container
                  sx={{
                    width: "40rem",
                    height: "100px",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginLeft: "3rem"
                    }}
                  >
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        autoComplete="off"
                        sx={{
                          marginTop: "1rem",
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
                    <Grid item>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{
                          marginLeft: "8.2rem",
                          marginTop: "1rem",
                        }}
                      >
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          {...register("image", {
                            required: {
                              value: true,
                              message: "ERROR: Photo is required!",
                            },
                          })}
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
                  <Grid
                    container
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginLeft: "3rem"
                    }}
                  >
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        type="number"
                        label="Price"
                        {...register("price", {
                          required: {
                            value: true,
                            message: "ERROR: Price is required!",
                          },
                          min: {
                            value: 1,
                            message: "ERROR: Minimum price is 1 €!",
                          },
                        })}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        label="Quantity"
                        type="number"
                        sx={{
                          marginLeft: "3.5rem",
                        }}
                        {...register("quantity", {
                          required: {
                            value: true,
                            message: "ERROR: Quantity is required!",
                          },
                          min: {
                            value: 1,
                            message: "ERROR: Minimum quantity is 1!",
                          },
                        })}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      marginTop: "1.5rem",
                      marginBottom: "1rem",
                      marginLeft: "3rem"
                    }}
                  >
                    <Grid item>
                      <Select
                        displayEmpty
                        required
                        value={brand}
                        {...register("brand")}
                        MenuProps={{
                          PaperProps: { sx: { maxHeight: 200 } },
                          disableScrollLock: true,
                        }}
                        sx={{
                          textAlign: "center",
                          width: "14rem",
                        }}
                        onChange={(e: any) => setBrand(e.target.value)}
                      >
                        <MenuItem disabled value="">
                          Please Select a Brand
                        </MenuItem>
                        {brands.map((brand: DisplayBrand, index: number) => {
                          return (
                            <MenuItem key={index} value={brand.name}>
                              {brand.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item>
                      <Select
                        displayEmpty
                        required
                        value={category}
                        MenuProps={{
                          PaperProps: { sx: { maxHeight: 200 } },
                          disableScrollLock: true,
                        }}
                        {...register("category")}
                        sx={{
                          textAlign: "center",
                          width: "14rem",
                          marginLeft: "3.5rem",
                        }}
                        onChange={(e: any) => setCategory(e.target.value)}
                      >
                        <MenuItem disabled value="">
                          Please Select a Category
                        </MenuItem>
                        {categories.map(
                          (category: DisplayCategory, index: number) => {
                            return (
                              <MenuItem key={index} value={category.name}>
                                {category.name}
                              </MenuItem>
                            );
                          }
                        )}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      marginTop: "1.5rem",
                      marginBottom: "1rem",
                      marginLeft: "3rem"
                    }}
                  >
                    <Grid item>
                      <TextareaAutosize
                        style={{
                          width: "14rem",
                          height: "3.5rem",
                        }}
                        placeholder="Short description here...."
                        {...register("shortDescription", {
                          required: {
                            value: true,
                            message: "ERROR: Description is required!",
                          },
                        })}
                      />
                    </Grid>
                    <Grid item>
                      <TextareaAutosize
                        placeholder="Description here...."
                        style={{
                          width: "14rem",
                          height: "3.5rem",
                          marginLeft: "3.5rem",
                        }}
                        {...register("description", {
                          required: {
                            value: true,
                            message: "ERROR: Description is required!",
                          },
                        })}
                      />
                    </Grid>
                  </Grid>
                  <Paper
                    sx={{
                      width: "37rem",
                      height: "16rem",
                      boxShadow: 3,
                      overflowY: "scroll",
                    }}
                  >
                    <List sx={{
                      textAlign: "center"
                    }}>
                      {Object.keys(specifications).map(
                        (key: any, index: any) => (
                          <ListItem sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                          }} key={index}>
                            <Typography
                              variant="h6"
                              sx={{
                                marginTop: "1rem"
                              }}
                            >
                              {key}:
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                marginTop: "1rem",
                                marginLeft: "1rem"
                              }}
                            >
                              {specifications[key]}
                            </Typography>
                            <Button onClick={() => deleteSpecificationField(key)} size="small" color="error" sx={{
                              marginLeft: "0.5rem",
                              marginTop: "1rem"
                            }}>
                              <FontAwesomeIcon icon={faTrashCan} color="red" size="xl" />
                            </Button>
                          </ListItem>
                        )
                      )}
                    </List>
                  </Paper>
                  <Grid container>
                    <Grid item>
                      <TextField
                        label="Specification Name"
                        autoComplete="off"
                        sx={{
                          marginTop: "1rem",
                          marginBottom: "1rem",
                          marginLeft: "4rem",
                          width: "10rem",

                        }}
                        onChange={handleNameSpecificationChange}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={addToSpecifications}
                        size="medium"
                        sx={{
                          marginLeft: "2.5rem",
                          marginRight: "2rem",
                          marginTop: "1.5rem"
                        }}
                      >Add</Button>
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Specification"
                        autoComplete="off"
                        sx={{
                          marginTop: "1rem",
                          marginBottom: "0.5rem",
                          width: "10rem",
                        }}
                        onChange={handleValueSpecificationChange}
                      />
                    </Grid>
                  </Grid>
                </Container>
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
      ) : (
        <h3>ERROR: No categories or brands found</h3>
      )}
    </>
  );
}
