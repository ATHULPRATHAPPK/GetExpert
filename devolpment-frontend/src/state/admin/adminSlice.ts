import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
  email: string | null;
}

const getInitialState = (): AdminState => {
  const savedAdmin = localStorage.getItem('admin');
  return savedAdmin ? JSON.parse(savedAdmin) : { email: null };
};

const initialState = getInitialState();

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<AdminState>) {
      const adminData = action.payload;
      localStorage.setItem('admin', JSON.stringify(adminData));
      return { ...state, ...adminData };
    },
    clearAdmin(state) {
      localStorage.removeItem('admin'); 
      return { email: null };
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
