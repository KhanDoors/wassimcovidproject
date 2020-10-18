import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import FormControl from "@material-ui/core/FormControl";
import { NativeSelect } from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "33em",
    width: "55em",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "50em",
    textAlign: "center",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CovidCountryChart() {
  const classes = useStyles();
  const [spacing, setSpacing] = useState(2);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [countryInfo, setCountryInfo] = useState("");

  const getCountryData = async () => {
    try {
      const res = await axios
        .get("https://covid19.mathdro.id/api/countries")
        .then((res) => setCountryData(res.data.countries))
        .then(setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountryData();
  }, []);

  const handleChange = (event) => {
    setSelected(event.target.value || "");
  };

  const callCountryData = async (selected) => {
    try {
      const res = await axios
        .get(`https://covid19.mathdro.id/api/countries/${selected}`)
        .then((res) => setCountryInfo(res.data))
        .then(setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callCountryData(selected);
  }, [selected]);

  const barChart = countryInfo.confirmed ? (
    <Bar
      data={{
        labels: ["Cases", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["blue", "green", "red"],
            data: [
              countryInfo.confirmed.value,
              countryInfo.recovered.value,
              countryInfo.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${selected}` },
      }}
    />
  ) : null;

  return (
    <Grid item xs={12} container className={classes.root} spacing={2}>
      {countryInfo !== null && loading !== true ? (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item>
              <Card className={classes.card}>
                <Container style={{ textAlign: "center" }}>
                  <FormControl>
                    <NativeSelect
                      onChange={handleChange}
                      style={{ width: 175 }}
                    >
                      <option value="global">Select Country</option>
                      {countryData.map((country, i) => (
                        <option key={i} value={country.name}>
                          {country.name}{" "}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Container>
                <CardContent>{barChart}</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
    </Grid>
  );
}
