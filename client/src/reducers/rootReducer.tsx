import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { categoriesReducer } from "./categoriesReducer";
import { roomsReducer } from "./roomsReducer";
import { bookingsReducer } from "./bookingsReducer";
import { typesReducer } from './typesReducer';
import { usersReducer } from './usersReducer';
import {getIdByEmailReducer} from './getIdByEmailReducer'
import {reviewsReducer} from './ReviewsReducer'
import {getCheckOut} from './getCheckOut';
import { loginReducer } from "./loginReducer";
import { searchBookingReducer } from "./searchBarReducer";
import { bookingsAdminReducer } from "./bookingsAdminReducer";

//ACA SE AGREGA CADA REDUCER QUE UTILICEN
export const rootReducer = combineReducers({
  //ej: ui: uiReducer, <- importamos el reducer
  categories: categoriesReducer,
  rooms: roomsReducer,
  adminui: adminReducer,
  bookings: bookingsReducer,
  types: typesReducer,
  users: usersReducer,
  idByMail: getIdByEmailReducer,  
  reviews:reviewsReducer,
  getCheckOut,
  login: loginReducer,
  booking_pax:searchBookingReducer,
  bookingsAdminR: bookingsAdminReducer,
});
