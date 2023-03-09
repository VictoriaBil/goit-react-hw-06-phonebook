import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { filter: '' },
  reducers: {
    setFilterContacts(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilterContacts } = filterSlice.actions;

// export const getFilterValue = state => state.filter;
