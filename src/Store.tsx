import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./apps/auth/slicers/PagesSlicer";
import Userreducer from "./apps/auth/slicers/Userslicer";

const store = configureStore({
  reducer: {
    page: pageReducer,
    user: Userreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
