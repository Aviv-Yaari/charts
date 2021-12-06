import { useState } from 'react';
import { GlobalStyle } from './assets/styles/general/GlobalStyle.styled';
import { MainContainer } from './assets/styles/MainContainer.styled';
import { AppHeader } from './components/AppHeader';
import { Chart } from './components/Chart';
import { LoginSignup } from './components/LoginSignup';
import { useFetch } from './hooks/useFetch';
import { authService, getCurrentUser } from './services/auth.service';

export interface Alert {
  type: 'error' | 'success';
  message: string;
}

function App() {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [user, setUser] = useState(getCurrentUser());
  const { fetchData } = useFetch(setAlert);

  const handleLogin = async (username: string, password: string) => {
    const user = await fetchData(() => authService.login(username, password));
    setUser(user);
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <AppHeader />
        {user ? <Chart setAlert={setAlert} /> : <LoginSignup onLogin={handleLogin} />}
        {alert && <div>Alert! {JSON.stringify(alert)}</div>}
      </MainContainer>
    </>
  );
}

export default App;
