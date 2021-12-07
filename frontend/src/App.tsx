import { useEffect, useState } from 'react';
import { AppAlert } from './components/AppAlert';
import { GlobalStyle } from './assets/styles/general/GlobalStyle.styled';
import { MainContainer } from './assets/styles/MainContainer.styled';
import { AppHeader } from './components/AppHeader';
import { Chart } from './components/Chart';
import { Login } from './components/Login';
import { useFetch } from './hooks/useFetch';
import { authService } from './services/auth.service';

export interface Alert {
  type: 'error' | 'success';
  message: string;
}

function App() {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [user, setUser] = useState(authService.getCurrentUser());
  const { fetchData, isLoading } = useFetch(setAlert);

  useEffect(() => {
    fetchData(authService.reloadUser).then(setUser);
  }, [fetchData]);

  const handleLogout = () => {
    fetchData(authService.logout).then(setUser);
  };

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
        <AppHeader user={user} onLogout={handleLogout} />
        {user ? <Chart setAlert={setAlert} /> : <Login onLogin={handleLogin} isLoading={isLoading} />}
        {alert && <AppAlert onClose={() => setAlert(null)} alert={alert} />}
      </MainContainer>
    </>
  );
}

export default App;
