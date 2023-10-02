import { createStore, combineReducers } from "redux";

function user(old = {}, newData) {
  if (newData.type == "LOGIN") {
    localStorage.setItem("user", JSON.stringify(newData.payload));
    return { ...newData.payload };
  } else if (newData.type === "LOG_OUT") {
    return {};
  } else {
    return { ...old };
  }
}

let allSections = combineReducers({ user });
let store = createStore(allSections);

export default store;
