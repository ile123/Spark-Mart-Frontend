//@ts-nocheck
import styles from "./ViewUser.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../../../services/user-Service";
import { getAddressById } from "../../../../services/address-Service";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CottageIcon from "@mui/icons-material/Cottage";

export default function ViewUser() {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});

  const {
    state: { userId },
  } = useLocation();

  useEffect(() => {
    getUserById(userId).then((result: any) => {
      setUser(result.data);
      getAddressById(result.data.addressId).then((result: any) =>
        setAddress(result.data)
      );
    });
  }, []);

  if (JSON.stringify(user) === "{}" && JSON.stringify(address) === "{}") {
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );
  }

  return (
    <Container
      sx={{
        flexGrow: 1,
        padding: 3,
      }}
    >
      <Grid
        container
        spacing={5}
        sx={{
          marginTop: "14rem",
        }}
      >
        <Grid item xs={6}>
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              height: "6rem",
              width: "6rem",
              marginLeft: "42.5%",
              marginBottom: "0.5rem",
            }}
          >
            <ManageAccountsIcon
              sx={{
                width: "6rem",
                height: "6rem",
              }}
            />
          </Avatar>
          <Paper
            sx={{
              padding: 2,
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              User Information
            </Typography>
            <Typography variant="body1">
              First Name: {user.firstName}
            </Typography>
            <Typography variant="body1">Last Name: {user.lastName}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Gender: {user.gender}</Typography>
            <Typography variant="body1">Role: {user.role}</Typography>
          </Paper>
          <Link to={"/editUserInformation"} state={{ userId: userId }}>
            <Button
              variant="outlined"
              sx={{
                height: "3.5rem",
                width: "8rem",
                textAlign: "center",
                marginTop: "0.5rem",
                marginLeft: "40%",
              }}
            >
              Edit
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              height: "6rem",
              width: "6rem",
              marginLeft: "42.5%",
              marginBottom: "0.5rem",
            }}
          >
            <CottageIcon
              sx={{
                width: "6rem",
                height: "6rem",
              }}
            />
          </Avatar>
          <Paper
            sx={{
              padding: 2,
            }}
          >
            {address.streetAddress !== "" ? (
              <div>
                <Typography variant="h6" textAlign={"center"}>
                  Address Information
                </Typography>
                <Typography variant="body1">
                  Street Address: {address.streetAddress}
                </Typography>
                <Typography variant="body1">City: {address.city}</Typography>
                <Typography variant="body1">
                  Postal Code: {address.postalCode}
                </Typography>
                <Typography variant="body1">
                  Province: {address.province}
                </Typography>
                <Typography variant="body1">
                  Country: {address.country}
                </Typography>
              </div>
            ) : (
              <Typography variant="h4" sx={{
                textAlign: "center",
                marginTop: "11%",
                marginBottom: "10%"
              }}>
                No Address
              </Typography>
            )}
          </Paper>
          <Link
            to="/editUserAddress"
            state={{ userId: userId, addressId: user.addressId }}
          >
            <Button
              variant="outlined"
              sx={{
                height: "3.5rem",
                width: "8rem",
                textAlign: "center",
                marginTop: "0.5rem",
                marginLeft: "40%",
              }}
            >
              Edit
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
