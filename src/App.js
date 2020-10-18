import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Covid19 from "./components/pages/Covid19";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Covid19 />
    </ThemeProvider>
  );
}

export default App;
