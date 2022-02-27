import { combineReducers } from "redux";
import * as type from "../types";
import remove from "lodash.remove";
const sidebarReducer = (state = false, action) => {
  switch (action.type) {
    case type.HANDLE_SIDEBAR:
      return action.payload;
    default:
      return state;
  }
};
const withoutLayoutReducer = (state = false, action) => {
  switch (action.type) {
    case type.WITHOUT_LAYOUT:
      return action.payload;
    default:
      return state;
  }
};
const userReducer = (state = null, action) => {
  switch (action.type) {
    case type.SET_USER:
      return action.payload;
    case type.CLEAN_USER:
      return action.payload;
    default:
      return state;
  }
};
const dialogReducer = (state = false, action) => {
  switch (action.type) {
    case type.TOGGLE_DIALOG:
      return action.payload;
    default:
      return state;
  }
};
const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case type.TOGGLE_LOADING:
      return action.payload;
    default:
      return state;
  }
};
const groupReducer = (state = [], action) => {
  switch (action.type) {
    case type.SET_LIST_GROUP:
      return action.payload;
    case type.SET_CURRENT_GROUP:
      let otherItems = state.filter((el) => el.title !== action.payload.title);
      otherItems.map((el) => {
        el.isActive = false;
      });
      remove(state, function (el) {
        return el.title === action.payload.title;
      });
      otherItems = [action.payload, ...otherItems];
      return otherItems;
    default:
      return state;
  }
};
const initialStateToggleSnackBar = {
  severity: "success",
  message: "",
  show: false,
};
const snackBarReducer = (state = initialStateToggleSnackBar, action) => {
  switch (action.type) {
    case type.TOGGLE_SNACKBAR:
      return action.payload;
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  withoutLayout: withoutLayoutReducer,
  user: userReducer,
  dialog: dialogReducer,
  group: groupReducer,
  loading: loadingReducer,
  snackBar: snackBarReducer,
});
