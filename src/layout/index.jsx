import { Fragment } from "react";
import { Router } from "../Router";
import { StyleManagment } from "../components";
import { Sidebar } from "../components";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Notification } from "../components";
export const Layout = () => {
  const { sidebar, withoutLayout } = useSelector((state) => state);
  return (
    <StyleManagment>
      <Notification />
      {withoutLayout ? (
        <Router />
      ) : (
        <Fragment>
          <Sidebar />
          <Box
            sx={(theme) => ({
              marginLeft: sidebar ? "270px" : "95px",
              marginTop: "2%",
              height: "96%",
              marginRight: "2%",
              transition: theme.transitions.create("margin-left", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            })}
          >
            <Router />
          </Box>
        </Fragment>
      )}
    </StyleManagment>
  );
};
