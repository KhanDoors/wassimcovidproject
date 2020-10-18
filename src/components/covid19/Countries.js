import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "30em",
    width: "30em",
    margin: 4,
  },
  media: {
    height: 150,
  },
  root: {
    margin: "2.5em",
    width: "100%",
    textAlign: "center",
  },
}));

export default function Countries() {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [searchCountries, setsearchCountries] = useState("");

  useEffect(() => {
    axios
      .get("https://corona.lmao.ninja/v2/countries")
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterCountries = results.filter((item) => {
    return searchCountries !== ""
      ? item.country.includes(searchCountries)
      : item;
  });

  return (
    <Grid>
      <Container className={classes.root}>
        <form noValidate autoComplete="on">
          <TextField
            style={{ width: "90%" }}
            id="standard-basic"
            label="Country Search"
            onChange={(e) => setsearchCountries(e.target.value)}
          />
        </form>
      </Container>
      <br />
      <Grid container justify="center" spacing={10}>
        {filterCountries.map((result, i) => {
          return (
            <Card className={classes.card} key={i}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={result.countryInfo.flag}
                  title="Country Flag"
                />
                <CardHeader title={result.country} />
                <CardContent
                  style={{ textAlign: "center", fontFamily: "Roboto" }}
                >
                  <Typography>
                    Total Cases:{" "}
                    <strong style={{ color: "red" }}>{result.cases}</strong>{" "}
                  </Typography>
                  <Typography>
                    Today's Cases:{" "}
                    <strong style={{ color: "red" }}>
                      {result.todayCases}
                    </strong>{" "}
                  </Typography>
                  <Typography>
                    Total Deaths:{" "}
                    <strong style={{ color: "red" }}>{result.deaths}</strong>{" "}
                  </Typography>
                  <Typography>
                    Today's Deaths:{" "}
                    <strong style={{ color: "red" }}>
                      {result.todayDeaths}
                    </strong>{" "}
                  </Typography>
                  <Typography>
                    Recovered:{" "}
                    <strong style={{ color: "red" }}>{result.recovered}</strong>{" "}
                  </Typography>
                  <Typography>
                    Active Cases:{" "}
                    <strong style={{ color: "red" }}> {result.active}</strong>{" "}
                  </Typography>
                  <Typography>
                    Critical Cases:{" "}
                    <strong style={{ color: "red" }}>{result.critical} </strong>{" "}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}
