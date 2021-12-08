import { useState } from 'react';
import { StyledLogin } from '../assets/styles/Login.styled';
import { ButtonLink, ButtonPrimary } from '../assets/styles/shared/Button.styled';
import { Input } from '../assets/styles/shared/Input.styled';

interface Props {
  onLogin: (username: string, password: string) => void;
  onSignup: (username: string, password: string) => void;
  isLoading: boolean;
}
export function Login({ onLogin, onSignup, isLoading }: Props) {
  const [values, setValues] = useState({ username: '', password: '' });
  const [page, setPage] = useState<'login' | 'signup'>('login');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault();
    if (page === 'login') onLogin(values.username, values.password);
    else onSignup(values.username, values.password);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target;
    setValues(values => ({ ...values, [name]: value }));
  };

  return (
    <StyledLogin onSubmit={handleSubmit}>
      <h2>{page === 'login' ? 'Log in' : 'Sign up'}</h2>
      <Input name="username" type="text" placeholder="Username" onChange={handleChange} required />
      <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <ButtonPrimary disabled={isLoading}>{isLoading ? 'Loading..' : 'Continue'}</ButtonPrimary>
      <div>
        <span>{page === 'login' ? 'Not a member?' : 'Already a member?'}</span>
        <ButtonLink disabled={isLoading} type="button" onClick={() => setPage(page === 'login' ? 'signup' : 'login')}>
          {page === 'login' ? 'Sign up' : 'Log In'}
        </ButtonLink>
      </div>
    </StyledLogin>
  );
}
