import styled, { css, keyframes } from 'styled-components';

export const Submit = styled.button`
  &,
  &:active,
  &:focus {
    outline: none;
  }

  &:active {
    background-color: rgba(33, 156, 105, 0.9);
  }

  &:disabled {
    color: #9a9a9a;

    background-color: #d8d8d8;
    box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.5);
    cursor: not-allowed;
  }
`;
