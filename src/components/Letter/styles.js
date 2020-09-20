import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';


export const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: '#fff';
  border: none;
  margin-right: 10px;
  margin-bottom: 10px;
  outline: none;
  font-weight: bolder;
  font-size: 18px;
  &:hover, &:active {
    background-color: ${darken(0.3, '#fff')};

  }
  &:disabled {
    background-color: ${darken(0.3, '#fff')};
  }
`;
