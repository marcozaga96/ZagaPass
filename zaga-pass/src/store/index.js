import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../reducers/filmReducer";
import animesReducer from "../reducers/animeReducer";
import serietvReducer from "../reducers/serieTVReducer";
import recensioniReducer from "../reducers/recensioniReducer";
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
  films: filmsReducer,
  animes: animesReducer,
  serietv: serietvReducer,
  recensioni: recensioniReducer,
  auth: authReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
export default store;
