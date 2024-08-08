import { User, IUser } from '../entities/User';

export const createUser = async (userData: IUser) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};
