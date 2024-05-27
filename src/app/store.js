import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slide/user'
export default configureStore({
    reducer: {
     
      user: userReducer,
     
    },
  });