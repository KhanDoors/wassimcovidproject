import { createMuiTheme } from "@material-ui/core/styles";

const first = "#131A40";
const second = "#355B8C";
const third = "#081826";
const fourth = "#17AEBF";
const fifth = "#30F2F2";
const sixth = "#D9042B";

export default createMuiTheme({
  palette: {
    common: {
      primary: first,
      secondary: second,
      error: sixth,
    },
    primary: {
      main: first,
    },
    secondary: {
      main: fourth,
    },
    error: {
      main: third,
    },
    warning: {
      main: sixth,
    },
    info: {
      main: fifth,
    },
    success: {
      main: fourth,
    },
  },
});
