import React from "react";
import Covid from "../covid19/Covid";
import CovidChart from "../covid19/CovidChart";
import CovidCountryChart from "../covid19/CovidCountryChart";
import Countries from "../covid19/Countries";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CovidMap from "./../covid19/CovidMap";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Covid19 = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        style={{ marginBottom: "1em", marginTop: "1em" }}
        container
        justify="center"
      >
        <Typography
          style={{ fontWeight: "bold", color: "#355B8C" }}
          variant="h2"
        >
          Covid - 19 Update
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <Covid />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid>
            <CovidChart />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid>
            <CovidCountryChart />
          </Grid>
        </Grid>
        <br />
      </Grid>
      <Grid
        style={{ marginBottom: "1em", marginTop: "1em" }}
        container
        justify="center"
      >
        <Typography
          style={{ fontWeight: "bold", color: "#355B8C" }}
          variant="h4"
        >
          Country Update
        </Typography>
      </Grid>
      <br />
      <Grid container justify="center">
        <Grid item>
          <CovidMap />
        </Grid>
      </Grid>
      <br />
      <Grid container justify="center">
        <Grid item style={{ marginBottom: "1em", marginTop: "1em" }}>
          <Countries />
        </Grid>
      </Grid>
    </>
  );
};

export default Covid19;
