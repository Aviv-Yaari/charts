import styled from 'styled-components';

export const Input = styled.input`
  outline: none;
  border: 1px solid #c5c6c9;
  border-radius: 4px;
  color: #404145;
  padding: 8px 12px;
  width: 100%;
  transition: border-color 0.15s ease-in-out;
  font-family: inherit;
  font-size: 0.9em;
  &:hover {
    border-color: #95979d;
  }
`;
