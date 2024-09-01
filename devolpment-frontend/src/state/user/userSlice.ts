import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  buildingNumber: string ;
  city: string ;
  pincode: string ;
  state: string ;
}

export interface UserState {
  email: string | null;
  name: string | null;
  phone:string |null
  userName?: string | null;
  address?: Address[] ;
  gender?: string | null;
  profilePhotoUrl?: string | null;
}

const getInitialState = (): UserState => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : { email: null, name: null, phone: null, address:[], gender: null, profilePhotoUrl: null };
};

const initialState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      const userData = action.payload;
      const updatedState = { ...state, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedState));
      return updatedState;
    },
    clearUser(state) {
      localStorage.removeItem('user');
      return { email: null, name: null, phone:null, address:[], gender: null, profilePhotoUrl: null };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
