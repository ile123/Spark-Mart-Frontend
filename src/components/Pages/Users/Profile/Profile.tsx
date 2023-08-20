//@ts-nocheck
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../../../services/user-Service";
import { getAddressById } from "../../../../services/address-Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Avatar,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HouseIcon from "@mui/icons-material/House";

export default function UserProfile() {
  const { userInfo } = useSelector((state: any) => state.auth);

  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    getUserById(userInfo.userId).then((result: any) => {
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
            <AccountCircleIcon
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
          <Link
            to={"/editUserInformation"}
            state={{ userId: userInfo?.userId }}
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
            <HouseIcon
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
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  marginTop: "11%",
                  marginBottom: "10%",
                }}
              >
                No Address
              </Typography>
            )}
          </Paper>
          <Link
            to="/editUserAddress"
            state={{ userId: userInfo?.userId, addressId: address.id }}
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
