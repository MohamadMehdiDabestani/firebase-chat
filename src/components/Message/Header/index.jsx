import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const Header = () => {
  const state = useSelector((state) => state.group).filter(
    (el) => el.isActive === true
  )[0];

  return (
    <Box
      sx={{
        paddingBottom: "20px",
        minHeight: "10%",
      }}
    >
      <Paper
        sx={{
          height: "100%",
          padding: "1% 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4">{state.title}</Typography>
          <Typography variant="subtitle1">2 کاربر</Typography>
        </Box>
      </Paper>
    </Box>
  );
};
