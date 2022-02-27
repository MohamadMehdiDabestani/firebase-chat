import { Fragment } from "react";
import GroupIcon from "@mui/icons-material/Group";
import { Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../";
import { setGroupList, toggleDialog } from "../../../../../redux/actions";
import { FormChannel } from "./FormChannel";
import { List } from "./List";
import { useFirebase } from "../../../../../hooks/useFirebase";
export const Channels = () => {
  const dispatch = useDispatch();
  const openDialog = () => {
    dispatch(toggleDialog(true));
  };
  return (
    <Fragment>
      <FormChannel />
      <Item Icon={GroupIcon} title="گروه ها" tooltip="گروه ها">
        <ListItem disablePadding onClick={openDialog}>
          <ListItemButton>
            <ListItemText primary="افزودن" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <List />
      </Item>
    </Fragment>
  );
};
