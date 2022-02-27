import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Rtl } from "./Rtl";
const theme = createTheme({
  direction: "rtl",
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
});
export const StyleManagment = (props) => {
  return (
    <Rtl>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Rtl>
  );
};
