import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactsApi } from './sliceContact';
import { userApi } from './userRTKQuery';
import FilterReduser from './sliceFilter';
import UserToken from './sliceUser';

const persistConfig = {
  key: 'phonebook',
  storage,
};

const rootReducer = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  filter: FilterReduser,
  token: UserToken,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(contactsApi.middleware)
      .concat(userApi.middleware),
});
export const persistor = persistStore(store);
