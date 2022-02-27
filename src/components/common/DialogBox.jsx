import { useTheme } from "@emotion/react";
import { Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog } from "../../redux/actions";

export const DialogBox = ({ title, children }) => {
  const open = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleDialog(false));
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog open={open} fullScreen={fullScreen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};
