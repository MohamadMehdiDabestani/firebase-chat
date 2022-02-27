import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/image/Login.svg";
import { Box, Button, Grid, Typography } from "@mui/material";
import { InputForm } from "../common/InputForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { withoutLayout } from "../../redux/actions";
import { useFirebase } from "../../hooks/useFirebase";
import { Loading } from "..";
const items = [
  {
    label: "ایمیل",
    icon: <AlternateEmailIcon />,
    id: "email",
    type: "text",
  },
  {
    label: "رمز عبور",
    id: "password",
    icon: <PasswordIcon />,
    type: "password",
  },
];
export const Login = () => {
  const dispatch = useDispatch();
  const { login } = useFirebase();
  useEffect(() => {
    dispatch(withoutLayout(true));
    return () => dispatch(withoutLayout(false));
  }, []);
  const validationHandler = yup.object({
    email: yup
      .string()
      .email("یک ایمیل معتبر وارد کنید")
      .required("یک ایمیل وارد کنید"),
    password: yup
      .string()
      .min(8, "رمز عبور باید بیشتر از 8 رقم باشد")
      .required("رمز عبور را وراد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationHandler,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });
  return (
    <Grid container height="100%">
      <Loading />
      <Grid
        item
        xl={7}
        lg={7}
        md={7}
        sx={{ display: { sm: "none", xs: "none", md: "block" } }}
      >
        <Box
          height="100%"
          justifyContent="center"
          display="flex"
          alignItems="center"
          sx={{
            img: { width: "75%" },
          }}
        >
          <img src={LoginImage} />
        </Box>
      </Grid>
      <Grid item xl={7} lg={5} md={5} sm={12} xs={12}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          bgcolor="#f7f7f7"
          justifyContent="center"
          height="100%"
          flexDirection="column"
          as="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography textAlign="center" variant="h6" marginBottom="30px">
            وارد حساب کاربری خود شوید
          </Typography>
          {items.map((el, idx) => (
            <InputForm
              {...el}
              sx={{ width: "75%", marginBottom: "35px" }}
              value={formik.values[el.id]}
              error={formik.errors[el.id]}
              touched={formik.touched[el.id]}
              change={formik.handleChange}
              key={idx}
            />
          ))}
          <Button variant="contained" sx={{ width: "70%" }} type="submit">
            ورود
          </Button>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              width: "70%",
              marginTop: "20px",
              backgroundColor: "var(--flickr-pink)",
              "&:hover": {
                backgroundColor: "#cb1f6d",
              },
            }}
            endIcon={<GoogleIcon />}
          >
            ورود با Google
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ width: "70%", marginTop: "20px" }}
            endIcon={<GitHubIcon />}
          >
            ورود با Github
          </Button>
          <Box marginTop="20px">
            <Typography variant="subtitle2" component="p" display="inline">
              حسابی ندارید ؟
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              display="inline-block"
              marginLeft="7px"
              color=""
              sx={{ "& a": { color: "#df2935" } }}
            >
              <Link to="/register">حسابی بسازید</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
