import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../reducers/filmReducer";
import animesReducer from "../reducers/animeReducer";
import serietvReducer from "../reducers/serieTVReducer";
import recensioniReducer from "../reducers/recensioniReducer";
import authReducer from "../reducers/authReducer";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const persisConfig = {
  storage: localStorage,
  key: "Root",
};

const rootReducer = combineReducers({
  films: filmsReducer,
  animes: animesReducer,
  serietv: serietvReducer,
  recensioni: recensioniReducer,
  auth: authReducer,
});
const persistedReducer = persistReducer(persisConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
const persistedStore = persistStore(store);
export { store, persistedStore };
