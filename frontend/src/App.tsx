import { useState } from 'react';
import { AppAlert } from './components/AppAlert';
import { GlobalStyle } from './assets/styles/general/GlobalStyle.styled';
import { MainContainer } from './assets/styles/MainContainer.styled';
import { AppHeader } from './components/AppHeader';
import { Chart } from './components/Chart';
import { Login } from './components/Login';
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
    const user = await fetchData(
      () => authService.login(username, password),
      'Could not login',
      'Logged in successfuly'
    );
    setUser(user);
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <AppHeader />
        {user ? <Chart setAlert={setAlert} /> : <Login onLogin={handleLogin} />}
        {alert && <AppAlert onClose={() => setAlert(null)} alert={alert} />}
      </MainContainer>
    </>
  );
}

export default App;
