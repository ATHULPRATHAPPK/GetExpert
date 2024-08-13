import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  email: string | null;
  name: string | null;
}

const getInitialState = (): UserState => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : { email: null, name: null };
};

const initialState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const userData = action.payload;
      localStorage.setItem('user', JSON.stringify(userData));
      return { ...state, ...userData };
    },
    clearUser(state) {
      localStorage.removeItem('user');
      return { email: null, name: null };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
