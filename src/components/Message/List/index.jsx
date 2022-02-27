import { Alert, Box} from "@mui/material";
import { Paper } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useFirebase } from "../../../hooks/useFirebase";
import { useSelector } from "react-redux";
import { Loading } from "../../common/Loading";
import { Item } from "./item";
export const List = () => {
  const { get } = useFirebase();
  const group = useSelector((state) => state.group);
  const loading = useSelector((state) => state.loading);
  const [list, setList] = useState([]);
  const settingList = () => {
    get(
      `message/${group.filter((el) => el.isActive === true)[0].id}`,
      (data) => {
        let listMessages = [];
        data.map((el) => {
          listMessages.push({
            message: el.message,
            userId: el.userId,
            userImage: el.userImage,
            created: el.created,
          });
        });
        setList(listMessages);
      }
    );
  };
  useEffect(() => {
    settingList();
  }, []);
  useEffect(() => {
    settingList();
  }, [group]);
  return (
    <Box
      sx={(theme) => ({
        paddingBottom: "20px",
        height: "60%",
        [theme.breakpoints.down("md")]: {
          height: "68%",
        },
      })}
    >
      <Paper
        sx={{
          padding: "1% 2%",
          height: "100%",
          position: "relative",
          overflowY: "scroll",
        }}
      >
        {loading ? (
          <Loading local={true} />
        ) : (
          <Fragment>
            {list.length === 0 ? (
              <Alert>
                تا به حال فردی پیامی منتشر نکرده است . اولین نفر باشید.
              </Alert>
            ) : (
              list.map((el) => <Item txt={el.message} img={el.userImage} />)
            )}
          </Fragment>
        )}
      </Paper>
    </Box>
  );
};
