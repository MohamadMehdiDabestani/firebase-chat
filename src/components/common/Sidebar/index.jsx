import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { handleSidebar } from "../../../redux/actions";

import { Profile } from "./Item/profile";
import { Channels } from "./Item/channels";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Sidebar = () => {
  const open = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(handleSidebar(!open));
  };

  return (
    <Drawer
      open={open}
      variant="permanent"
      sx={{
        "& > div": {
          boxShadow: "0px 0px 6px 0px #999cbd69",
          padding: "0 10px",
          boxSizing: "border-box",
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleClick}>
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </DrawerHeader>
      <Profile />
      <Channels />
    </Drawer>
  );
};
