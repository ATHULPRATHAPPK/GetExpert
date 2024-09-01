import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TechnicianState {
  name: string | null;
  email: string | null;
  // Add other technician-specific fields as needed
}

const getInitialState = (): TechnicianState => {
  const savedTechnician = localStorage.getItem('technician');
  return savedTechnician ? JSON.parse(savedTechnician) : { name: null, email: null };
};

const initialState = getInitialState();

const technicianSlice = createSlice({
  name: 'technician',
  initialState,
  reducers: {
    setTechnician(state, action: PayloadAction<TechnicianState>) {
      const technicianData = action.payload;
      localStorage.setItem('technician', JSON.stringify(technicianData));
      return { ...state, ...technicianData };
    },
    
    clearTechnician(state) {
      localStorage.removeItem('technician');
      return { name: null, email: null };
    },
  },
});

export const { setTechnician, clearTechnician } = technicianSlice.actions;
export const technicianReducer = technicianSlice.reducer;
