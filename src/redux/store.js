import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ContactReduser from './sliceContact';
import FilterReduser from './sliceFilter';

const rootReducer = combineReducers({
  contacts: ContactReduser,
  filter: FilterReduser,
});

//--------схема Middleware-------//
// const customerMiddleware = state => {
//   return next => {
//     return action => {
//       if (typeof action === 'function') {
//         action(state.dispatch); //----якщо функція, то викликається функція куди передається dispatch, що викликається в функції getAllContanct
//         return;
//       }
//       return next(action);
//     };
//   };
// };

export const store = configureStore({
  reducer: rootReducer,
  // middleware: [customerMiddleware],
});
