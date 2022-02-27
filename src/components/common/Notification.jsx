import { Fragment } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackBar } from "../../redux/actions/";
export const Notification = () => {
  const { severity, message, show } = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();
  if (!show) return <Fragment></Fragment>;
  return (
    <Snackbar
      open={show}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={4000}
      onClose={() => dispatch(toggleSnackBar({ message: "", show: false }))}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
