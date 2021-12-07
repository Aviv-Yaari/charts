import { httpService } from './http.service';

export interface User {
  _id: string;
  username: string;
  fullname: string;
}

const login = async (username: string, password: string) => {
  const user = await httpService.post('auth/login', { username, password });
  _saveToStorage(user);
  return user;
};

const logout = async () => {
  sessionStorage.clear();
  await httpService.post('auth/logout');
  return null;
};

const signup = async (username: string, fullname: string, password: string) => {
  const user = await httpService.post('auth/signup', { username, fullname, password });
  _saveToStorage(user);
  return user;
};

const reloadUser = async () => {
  const user = await httpService.get('auth/current');
  if (user) _saveToStorage(user);
  else sessionStorage.clear();
  return user;
};

const getCurrentUser = () => {
  try {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (err) {
    return null;
  }
};

export const authService = { login, logout, signup, getCurrentUser, reloadUser };

function _saveToStorage(user: User) {
  sessionStorage.setItem('user', JSON.stringify(user));
}
