import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import cameraReducer from '../features/cameraSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    camera : cameraReducer,
  },
});
