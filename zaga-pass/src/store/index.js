import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../reducers/filmReducer";
import animesReducer from "../reducers/animeReducer";
import serietvReducer from "../reducers/serieTVReducer";

const rootReducer = combineReducers({
  films: filmsReducer,
  animes: animesReducer,
  serietv: serietvReducer,
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
