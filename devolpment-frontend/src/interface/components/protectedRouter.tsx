import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store'; 

interface UserState {
  email: string | null; 
  name: string | null;  
}

export const ProtectedRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.user) as UserState;
  return user.email && user.name ? <Outlet /> : <Navigate to="/login" />;
};
