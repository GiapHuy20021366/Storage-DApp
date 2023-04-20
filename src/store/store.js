import { configureStore } from "@reduxjs/toolkit";
import contractSlice from "./slices/contractSlice";
import fileContextSlice from "./slices/fileContextSlice";
export const store = configureStore({
  reducer: {
    contractStorage: contractSlice,
    fileContext: fileContextSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
