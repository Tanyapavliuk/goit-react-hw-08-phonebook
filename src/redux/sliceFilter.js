import { createSlice } from '@reduxjs/toolkit';

const initialStateFilter = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStateFilter,
  reducers: {
    changeFilter: (_, actions) => {
      return actions.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
