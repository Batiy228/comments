import { combineReducers } from "@reduxjs/toolkit";
import commentsReducer from "../../widgets/Comments/model/commentsSlice";

export const rootReducer = combineReducers({
  comments: commentsReducer,
});
