import { Box, Paper, Typography } from "@mui/material";

export const Item = ({ txt, img }) => {
  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Paper
        sx={{
          width: "auto",
          display: "inline-flex",
          img: {
            objectFit: "cover",
          },
        }}
      >
        <img src={img} alt="" />
        <Typography sx={{ padding: "10px", lineHeight: "28px" }}>
          {txt}
        </Typography>
      </Paper>
    </Box>
  );
};
