import { InputForm } from "../../";
import { Box, Button, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useFirebase } from "../../../hooks/useFirebase";
import { useFormik } from "formik";
import * as yup from "yup";
export const Input = () => {
  const { insert } = useFirebase();
  const group = useSelector((state) => state.group);
  const user = useSelector((state) => state.user);
  const validationHandler = yup.object({
    message: yup.string().required("متنی را وارد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: validationHandler,
    onSubmit: (values) => {
      sendMessage(values.message);
    },
  });
  const sendMessage = (message) => {
    const id = uuidv4();
    insert(
      {
        message: message,
        userId: user.uid,
        userImage: user.photoURL,
        created: new Date().toDateString(),
      },
      id,
      `message/${group.filter((el) => el.isActive === true)[0].id}`
    ).finally(() => {
      formik.setValues({ message: "" });
      formik.setErrors({ message: "" });
      formik.setTouched({ message: "" });
    });
  };
  return (
    <Box
      sx={{
        minHeight: "10%",
      }}
    >
      <Paper
        sx={{
          minHeight: "100%",
          padding: "1% 2%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <InputForm
          id="message"
          type="text"
          value={formik.values.message}
          error={formik.errors.message}
          touched={formik.touched.message}
          change={formik.handleChange}
          label="پیام خود را وارد کنید"
          sx={{ width: "100%" }}
          variant="outlined"
        />
        <Button
          color="info"
          sx={{
            marginTop: "20px",
          }}
          variant="contained"
          fullWidth
          type="submit"
        >
          ارسال پیام
        </Button>
      </Paper>
    </Box>
  );
};
