import { combineReducers } from "redux";
import yelpReducer from "../features/yelpSlice";

export default combineReducers({
  yelp: yelpReducer,
  //add future reducers here
});
