import { createUser, findUserByEmail } from '../../domain/repositories/userRepo';
import { IUser } from '../../domain/entities/User';
import bcrypt from 'bcryptjs';

export const registerUser = async (userData: IUser) => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  userData.password = await bcrypt.hash(userData.password, 10);
  return createUser(userData);
};
