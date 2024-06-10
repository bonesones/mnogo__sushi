import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userPersistReducer from "./userPersistSlice.js";
import userPrivateReducer from "./userPrivateSlice.js";
import categoriesReducer from "./categoriesSlice.js";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import basketPersistSlice from "./basketPersistSlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userPersistReducer);
const basketPersistedReducer = persistReducer(
  persistConfig,
  basketPersistSlice,
);

const rootReducer = combineReducers({
  userPersist: userPersistedReducer,
  userPrivate: userPrivateReducer,
  basketPersist: basketPersistedReducer,
  categories: categoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
