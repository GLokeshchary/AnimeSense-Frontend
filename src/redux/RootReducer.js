import { combineReducers } from "redux";
import cartreducer from "./slice/cartSlice";
import wishlistreducer from "./slice/wishlistSlice";
import addressreducer from "./slice/addressSlice";
import userReducer from "./slice/userSlice";
const rootReducer = combineReducers({
  cart: cartreducer,
  wishlist: wishlistreducer,
  address: addressreducer,
  user: userReducer,
});
export default rootReducer;
