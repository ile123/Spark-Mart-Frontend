import ThunderBolt from "../../UI/SVG/ThunderBolt";
import styles from "./AboutUs.module.css";
import { Grid, Container, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <>
      <Container>
        <Grid container>
          <Grid
            item
            sx={{ textAlign: "center", marginLeft: "25rem", marginTop: "4rem" }}
          >
            <Typography variant="h4">Made By: Ilario Batistić</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ width: "80rem" }}>
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                marginTop: "10rem",
                marginLeft: "1rem",
                textAlign: "center",
              }}
            >
              Property of SOSS
            </Typography>
          </Grid>
          <Grid item sx={{ marginTop: "3rem", marginLeft: "8rem" }}>
            <ThunderBolt width={300} height={300} />
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              sx={{ marginLeft: "7rem", marginTop: "10rem" }}
            >
              Email: ib47425@oss.unist.hr
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                marginTop: "4.5rem",
                marginLeft: "25rem",
                textAlign: "center",
              }}
            >
              Made as a final thesis
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
