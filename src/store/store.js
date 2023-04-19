import { configureStore } from "@reduxjs/toolkit";
import contractSlice from "./slices/contractSlice";
export const store = configureStore({
  reducer: {
    contractStorage: contractSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
