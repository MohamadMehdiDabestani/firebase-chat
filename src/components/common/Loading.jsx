import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../../redux/actions";

export const Loading = ({ local }) => {
  const open = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleLoading(false));
  };
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: local ? "absolute" : "fixed",
      }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
