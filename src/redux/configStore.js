import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import nguoiDung from "./nguoiDung";
export const store = configureStore({
  reducer: {
    authSlice,
    nguoiDung,
  },
});
