import { StyledAppHeader } from '../assets/styles/AppHeader.styled';
import { ButtonSecondary } from '../assets/styles/shared/Button.styled';
import { User } from '../services/auth.service';

interface Props {
  user: User;
  onLogout: () => void;
}
export function AppHeader({ user, onLogout }: Props) {
  return (
    <StyledAppHeader>
      <h1>Charts</h1>
      {user && <ButtonSecondary onClick={onLogout}>Logout</ButtonSecondary>}
    </StyledAppHeader>
  );
}
