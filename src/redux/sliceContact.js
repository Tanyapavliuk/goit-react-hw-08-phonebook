import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { getContacts } from 'servises/getContacts';
import { handelPanding, handelRejected } from './handelsContacts';
import { addNewContact } from 'servises/addContact';
import { deleteContact } from 'servises/deleteContact';

export const getAllContanct = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    return await getContacts();
  }
);

export const addContanct = createAsyncThunk(
  'contacts/addContanct',
  async newContact => {
    return await addNewContact(newContact.name, newContact.phone);
  }
);

export const deleteContactByID = createAsyncThunk(
  'contact/deleteContactByID',
  async id => await deleteContact(id)
);

const initialStateContacts = {
  contacts: [],
  isLoading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'contacts',
  initialState: initialStateContacts,

  extraReducers: builder => {
    builder
      .addCase(getAllContanct.fulfilled, (_, action) => {
        return {
          isLoading: false,
          contacts: [...action.payload],
          error: null,
        };
      })
      .addCase(addContanct.fulfilled, (state, action) => {
        return {
          ...state,
          contacts: [...state.contacts, action.payload],
          isLoading: false,
          error: null,
        };
      })
      .addCase(deleteContactByID.fulfilled, (state, action) => {
        return {
          contacts: state.contacts.filter(({ id }) => id !== action.payload.id),
          isLoading: false,
          error: null,
        };
      })
      .addMatcher(
        isAnyOf(
          deleteContactByID.rejected,
          addContanct.rejected,
          deleteContactByID.rejected
        ),
        handelRejected
      )
      .addMatcher(
        isAnyOf(
          deleteContactByID.pending,
          addContanct.pending,
          deleteContactByID.pending
        ),
        handelPanding
      );
  },
});

export const { addContact, deliteContact } = counterSlice.actions;
export default counterSlice.reducer;

// //--------асинхронна функція запиту на бекенд----------
// export const getAllContanct = () => {
//   return async dispatch => {
//     //----dispatch з middleware, що перевіряє це функція чи об'єкт.
//     //----якщо функція викликає її та повертає, якщо об'єкт просто повертає
//     try {
//       dispatch(counterSlice.actions.fetching());
//       const data = await getContacts();
//       dispatch(counterSlice.actions.fetchSuccess(data));
//     } catch (error) {
//       dispatch(counterSlice.actions.fetchError('Smth was wrong'));
//     }
//   };
// };

// const counterSlice = createSlice({
//   name: 'contacts',
//   initialState: initialStateContacts,

//   --------------для функції без createAsyncThunk
//   reducers: {
//     fetching: (state, _) => ({ ...state, isLoading: true }),
//     fetchSuccess: (state, action) => ({
//       ...state,
//       isLoading: false,
//       contacts: [...action.payload],
//       error: null,
//     }),
//     fetchError: (state, action) => ({
//       ...state,
//       isLoading: false,
//       error: action.payload,
//     }),
//   },
// });

//-----------------------------------------------------------------------
//-----------------------редюсери для createAsyncThunk ---------------//
// const counterSlice = createSlice({
//   name: 'contacts',
//   initialState: initialStateContacts,

//   extraReducers: {
//     [getAllContanct.pending]: (state, _) => ({ ...state, isLoading: true }),
//     [getAllContanct.fulfilled]: (state, action) => ({
//       ...state,
//       isLoading: false,
//       contacts: [...action.payload],
//       error: null,
//     }),
//     [getAllContanct.rejected]: (state, action) => ({
//       ...state,
//       isLoading: false,
//       error: action.payload,
//     }),
//   },
// });
