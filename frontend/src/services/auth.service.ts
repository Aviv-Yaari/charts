import { httpService } from './http.service';

interface User {
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
  return httpService.post('auth/logout');
};

const signup = async (username: string, fullname: string, password: string) => {
  const user = await httpService.post('auth/signup', { username, fullname, password });
  _saveToStorage(user);
  return user;
};

export const getCurrentUser = () => {
  try {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (err) {
    return null;
  }
};

export const authService = { login, logout, signup };

function _saveToStorage(user: User) {
  sessionStorage.setItem('user', JSON.stringify(user));
}
