import { StyledAppHeader } from '../assets/styles/AppHeader.styled';
import { Button } from '../assets/styles/shared/Button.styled';

export function AppHeader() {
  return (
    <StyledAppHeader>
      <h1>Charts</h1>
      <Button>Log in</Button>
    </StyledAppHeader>
  );
}
