import { useState } from 'react';
import { StyledLogin } from '../assets/styles/Login.styled';
import { Button } from '../assets/styles/shared/Button.styled';
import { Input } from '../assets/styles/shared/Input.styled';

interface Props {
  onLogin: (username: string, password: string) => void;
}
export function Login({ onLogin }: Props) {
  const [values, setValues] = useState({ username: 'username', password: 'password' });

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault();
    onLogin(values.username, values.password);
  };

  return (
    <StyledLogin onSubmit={handleLogin}>
      <h2>Log in</h2>
      <div>
        <Input type="text" placeholder="username" />
        <Input type="password" placeholder="password" />
      </div>
      <Button>Continue</Button>
      <Button type="button" onClick={() => onLogin('username', 'password')}>
        Easy login - for dev purposes
      </Button>
    </StyledLogin>
  );
}
