import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { Item } from "../";
import { useFirebase } from "../../../../../hooks/useFirebase";
export const Profile = () => {
  const { logout } = useFirebase();
  const user = useSelector((state) => state.user);
  return (
    <Item
      Icon={AccountCircleIcon}
      displayName={user?.displayName}
      title="حساب کاربری"
      tooltip="حساب کاربری"
    >
      <ListItem disablePadding onClick={logout}>
        <ListItemButton>
          <ListItemText primary="خروج از حساب" />
        </ListItemButton>
      </ListItem>
    </Item>
  );
};
