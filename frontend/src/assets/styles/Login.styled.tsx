import styled from 'styled-components';

export const StyledLogin = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100vw;
  max-width: 300px;
  gap: 10px;
  background: #fff;
  padding: 20px;
  input:last-of-type {
    margin-bottom: 10px;
  }
  input:first-of-type {
    margin-top: 10px;
  }
`;
