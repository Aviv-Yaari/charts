import styled from 'styled-components';
import { Alert } from '../../App';

export const StyledAppAlert = styled.div<{ type: Alert['type'] }>`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px;
  background-color: ${props => (props.type === 'error' ? '#ffd7db' : '#c4ffb5')};
  width: 100%;
  max-width: 350px;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 #c9c9c9;
`;
