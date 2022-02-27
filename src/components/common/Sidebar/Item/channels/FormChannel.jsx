import { useFormik } from "formik";
import * as yup from "yup";
import { DialogBox } from "../../../DialogBox";
import { DialogActions, DialogContent, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog } from "../../../../../redux/actions";
import { InputForm } from "../../../InputForm";
import { useFirebase } from "../../../../../hooks/useFirebase";
import { v4 as uuidv4 } from "uuid";
const items = [
  {
    label: "عنوان گروه",
    id: "title",
    type: "text",
  },
  {
    label: "توضیحات",
    id: "description",
    type: "text",
    rest: { multiline: true, rows: 4, helperText: "اختیاری" },
  },
];
export const FormChannel = () => {
  const open = useSelector((state) => state.dialog);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { insert } = useFirebase();
  const handleDialog = () => {
    dispatch(toggleDialog(!open));
  };
  const validationHandler = yup.object({
    title: yup.string().required("عنوان گروه را وارد کنید"),
    description: yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationHandler,
    onSubmit: (values) => {
      const id = uuidv4();
      insert(
        {
          title: values.title,
          description: values.description,
          id,
          createdBy: {
            userId: user.uid,
            displayName: user.displayName,
          },
        },
        id,
        "channels"
      ).finally(() => {
        items.map((el) => {
          formik.setValues({ [el.id]: "" });
          formik.setErrors({ [el.id]: "" });
          formik.setTouched({ [el.id]: "" });
          handleDialog()
        });
      });
    },
  });
  return (
    <DialogBox title="افزودن گروه">
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {items.map((el, idx) => (
            <InputForm
              {...el}
              sx={{ width: "100%", marginBottom: "15px" }}
              value={formik.values[el.id]}
              error={formik.errors[el.id]}
              touched={formik.touched[el.id]}
              change={formik.handleChange}
              key={idx}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="error">
            لغو
          </Button>
          <Button type="submit">افزودن</Button>
        </DialogActions>
      </form>
    </DialogBox>
  );
};
