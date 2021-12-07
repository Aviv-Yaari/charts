import { useEffect } from 'react';
import { setTimeout } from 'timers';
import { Alert } from '../App';
import { StyledAppAlert } from '../assets/styles/AppAlert.styled';

interface Props {
  alert: Alert;
  onClose: () => void;
}
export function AppAlert({ alert, onClose }: Props) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);
  return <StyledAppAlert type={alert.type}>{alert.message}</StyledAppAlert>;
}
