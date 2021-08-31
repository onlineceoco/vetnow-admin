import { createTheme } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "iransans",
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#ab003c",
    },
  },
});

export default theme;
