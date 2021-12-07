import { useState } from 'react';
import { StyledLogin } from '../assets/styles/Login.styled';
import { ButtonPrimary, ButtonSecondary } from '../assets/styles/shared/Button.styled';
import { Input } from '../assets/styles/shared/Input.styled';

interface Props {
  onLogin: (username: string, password: string) => void;
  isLoading: boolean;
}
export function Login({ onLogin, isLoading }: Props) {
  const [values, setValues] = useState({ username: '', password: '' });

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault();
    onLogin(values.username, values.password);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target;
    setValues(values => ({ ...values, [name]: value }));
  };

  return (
    <StyledLogin onSubmit={handleLogin}>
      <h2>Log in</h2>
      <Input name="username" type="text" placeholder="Username" onChange={handleChange} />
      <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <ButtonPrimary disabled={isLoading}>{isLoading ? 'Logging in..' : 'Continue'}</ButtonPrimary>
      <ButtonSecondary disabled={isLoading} type="button" onClick={() => onLogin('username', 'password')}>
        Easy login - for dev purposes
      </ButtonSecondary>
    </StyledLogin>
  );
}
