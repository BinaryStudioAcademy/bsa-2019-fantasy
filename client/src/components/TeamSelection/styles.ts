import styled, { css, keyframes } from 'styled-components';

export const appear = keyframes`
  from {
    opacity: 0.75;
  }
  to {
    opacity: 1;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: sticky;
  top: 1rem;

  flex: 1 0;
  width: 100%;
  max-width: 52rem;
  min-height: calc(100vh - 2rem);
  height: calc(100vh - 2rem);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;

  padding: 1rem 4rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.5s;
`;

export const ViewToggles = styled.div`
  z-index: 4000;

  position: absolute;
  top: 1rem;
  right: 1rem;

  display: flex;
  justify-content: center;
  overflow: hidden;

  background-color: rgb(33, 156, 105);
  border-radius: 3px;
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.5);
`;

export const Toggle = styled.div<{ isActive: boolean }>`
  padding: 0.5rem;

  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

  user-select: none;
  transition: background-color 0.16s, color 0.16s;

  ${(props) =>
    props.isActive
      ? css`
          color: #000;
          background-color: #fff;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        `
      : css`
          color: #fff;
          background-color: transparent;
          cursor: pointer;
        `}

  svg {
    font-size: inherit;
  }
`;

export const Submit = styled.button`
  padding: 0.5rem 4rem;

  font-weight: bold;
  color: #fff;

  background-color: rgb(33, 156, 105);
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.5);
  opacity: 1;

  transition: background-color 0.16s, color 0.16s;

  &:disabled {
    background-color: #d8d8d8;
    color: #9a9a9a;

    cursor: not-allowed;
  }
`;
