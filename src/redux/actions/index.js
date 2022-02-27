import * as type from "../types";

export const handleSidebar = (state) => {
  return {
    type: type.HANDLE_SIDEBAR,
    payload: state,
  };
};
export const withoutLayout = (state) => {
  return {
    type: type.WITHOUT_LAYOUT,
    payload: state,
  };
};
export const setUser = (state) => {
  return {
    type: type.SET_USER,
    payload: state,
  };
};
export const cleanUser = (state) => {
  return {
    type: type.CLEAN_USER,
    payload: state,
  };
};
export const toggleDialog = (state) => {
  return {
    type: type.TOGGLE_DIALOG,
    payload: state,
  };
};
export const toggleLoading = (state) => {
  return {
    type: type.TOGGLE_LOADING,
    payload: state,
  };
};
export const setGroupList = (state) => {
  return {
    type: type.SET_LIST_GROUP,
    payload: state,
  };
};
export const setCurrentGroup = (state) => {
  return {
    type: type.SET_CURRENT_GROUP,
    payload: state,
  };
};
export const toggleSnackBar = (state) => {
  return {
    type: type.TOGGLE_SNACKBAR,
    payload: state,
  };
};
