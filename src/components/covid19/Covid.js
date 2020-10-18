import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "30em",
    width: "30em",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  root: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Covid() {
  const classes = useStyles();
  const [spacing] = useState(2);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLatest = async () => {
    try {
      const res = await axios
        .get("https://covid19.mathdro.id/api")
        .then((res) => setLatest(res.data))
        .then(setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLatest();
  }, []);

  let today = new Date(latest.lastUpdate).toString();

  if (!latest.confirmed) {
    return "Loading...";
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      {latest !== null && loading !== true ? (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <span role="img" aria-label="covid19">
                        {" "}
                        📈
                      </span>
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Cases as of:"
                  subheader={today}
                />
                <CardMedia
                  className={classes.media}
                  image="https://ewscripps.brightspotcdn.com/dims4/default/d396a36/2147483647/strip/true/crop/1280x720+0+0/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F3f%2Ffc%2F9f1d34714b5a9ddf0ea13a697a79%2Fcoronavirus-cases2.jpg"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    The coronavirus COVID-19 is affecting 199 countries and
                    territories around the world. <br />
                    The Total Number of Cases is:
                    <strong style={{ color: "red" }}>
                      {" "}
                      <CountUp
                        start={0}
                        separator=","
                        duration={5}
                        end={latest.confirmed.value}
                      />
                    </strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <span role="img" aria-label="covid19">
                        {" "}
                        📈
                      </span>
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Deaths as of:"
                  subheader={today}
                />
                <CardMedia
                  className={classes.media}
                  image="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_virus_3d_render_red_03_other.jpg"
                  title="Codid19Deaths"
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    The COVID-19 outbreak is an unprecedented global public
                    health challenge.
                    <br /> The Total Number of Deaths is:
                    <strong style={{ color: "red" }}>
                      {" "}
                      <CountUp
                        start={0}
                        separator=","
                        duration={5}
                        end={latest.deaths.value}
                      />
                    </strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <span role="img" aria-label="covid19">
                        {" "}
                        📈
                      </span>
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Recoveries as of:"
                  subheader={today}
                />
                <CardMedia
                  className={classes.media}
                  image="https://images.foxtv.com/static.fox26houston.com/www.fox26houston.com/content/uploads/2020/03/764/432/RECOVERED.jpg?ve=1&tl=1"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    Recoveries are rising steadily. <br />
                    The Total Number of Recovered is:
                    <strong style={{ color: "red" }}>
                      {" "}
                      <CountUp
                        start={0}
                        separator=","
                        duration={5}
                        end={latest.recovered.value}
                      />
                    </strong>
                  </Typography>
                </CardContent>
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
