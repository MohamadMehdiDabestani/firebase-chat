import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Tooltip,
  Typography,
  List,
  ListSubheader,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { handleSidebar } from "../../../../redux/actions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fragment } from "react";

export const Item = ({ Icon, title, tooltip, children, displayName }) => {
  const open = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const openSidebar = () => {
    dispatch(handleSidebar(true));
  };
  return (
    <Accordion>
      <AccordionSummary
        disableGutters={true}
        onClick={openSidebar}
        sx={{ "&>div": { margin: "0" }, "& span": { display: "flex" } }}
        expandIcon={open ? <ExpandMoreIcon /> : null}
      >
        {open == false && (
          <Tooltip arrow title={tooltip} placement="right-start">
            <Icon />
          </Tooltip>
        )}
        {open && (
          <Fragment>
            <Icon />
            <Typography sx={{ display: "flex", ml: "7px" }}>{title}</Typography>
          </Fragment>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0px" }}>
        <List
          subheader={
            <ListSubheader component="div" sx={{ lineHeight: "20px" }}>
              {displayName}
            </ListSubheader>
          }
          sx={(theme) => ({
            "&  .active  li": {
              background: "#a5a5a540",
            },
            "&  a  li": {
              transition: theme.transitions.create("background", {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
            "& a li:hover": {
              background: "#a9a1e714",
            },
            "& a": { color: "black", textDecoration: "none" },
          })}
        >
          {children}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
