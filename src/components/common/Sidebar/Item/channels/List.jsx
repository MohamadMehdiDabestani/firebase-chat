import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../../../../../hooks/useFirebase";
import { setCurrentGroup, setGroupList } from "../../../../../redux/actions";
import { Loading } from "../../../Loading";

export const List = () => {
  const loading = useSelector((state) => state.loading);
  const group = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const { get } = useFirebase();
  useEffect(() => {
    get("channels", (data) => {
      let obj = [];
      data.map((el) => {
        obj.push({
          title: el.title,
          isActive: false,
          id: el.id,
        });
      });
      dispatch(setGroupList(obj));
    });
  }, []);
  const handleClick = (el) => {
    el.isActive = true;
    dispatch(setCurrentGroup(el));
  };
  if (loading && group.length <= 0) return <Loading local={true} />;
  return (
    <Fragment>
      {group.map((el, idx) => (
        <ListItem key={idx} disablePadding onClick={() => handleClick(el)}>
          <ListItemButton>
            <ListItemText primary={el.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </Fragment>
  );
};
