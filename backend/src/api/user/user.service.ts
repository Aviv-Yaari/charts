import { Error, FilterQuery } from 'mongoose';
import { ExpressError } from '../../services/error.service';
import { User, UserModel } from './user.model';

const add = async (userDetails: User) => {
  try {
    const user = new UserModel(userDetails);
    await user.save();
  } catch (err) {
    if (err instanceof Error.ValidationError) throw new ExpressError(err.message, 400);
    throw err;
  }
};

const query = async (filter: FilterQuery<User>) => {
  const user = await UserModel.findOne(filter);
  return user;
};

export const userService = { add, query };
