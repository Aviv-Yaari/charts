import { useState } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}
export function LoginSignup({ onLogin }: Props) {
  const [values, setValues] = useState({ username: 'username', password: 'password' });

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault();
    onLogin(values.username, values.password);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <button>Login</button>
      </form>
    </div>
  );
}
