import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9em;
`;

export const ButtonPrimary = styled(Button)`
  border: 1px solid #1dbf73;
  background: #1dbf73;
  color: #fff;
  &:hover {
    border-color: #19925a;
    background: #19925a;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: #fff;
  color: #1dbf73;
  border: 1px solid #1dbf73;
  &:hover {
    color: #fff;
    background: #1dbf73;
  }
`;
