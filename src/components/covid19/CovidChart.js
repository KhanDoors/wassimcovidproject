import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Line } from "react-chartjs-2";

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
}));

export default function CovidChart() {
  const classes = useStyles();
  const [spacing, setSpacing] = useState(2);
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDailyData = async () => {
    try {
      const res = await axios
        .get("https://covid19.mathdro.id/api/daily")
        .then((res) => setDailyData(res.data))
        .then(setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDailyData();
  }, []);

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map((data) => data.reportDate),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed.total),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths.total),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <Grid item xs={12} container className={classes.root} spacing={2}>
      {dailyData !== null && loading !== true ? (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid>
              <Card className={classes.card}>
                <CardContent>{lineChart}</CardContent>
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
