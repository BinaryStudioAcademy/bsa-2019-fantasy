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
  bottom: 1rem;

  flex: 1 0;
  width: 100%;
  max-width: 52rem;
  max-height: 45rem;

  overflow: hidden;
  padding: 5rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.5s;
`;

export const Tooltip = styled.div`
  z-index: 10000;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 4rem;

  padding: 0.5rem 0;
  overflow: hidden;
  display: flex;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.32s;
`;

export const ViewToggles = styled.div`
  position: absolute;
  left: 1rem;

  display: flex;
  justify-content: center;
  overflow: hidden;

  background-color: rgb(33, 156, 105);
  border-radius: 3px;
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.5);
`;

export const Submit = styled.button`
  position: absolute;
  right: 1rem;

  padding: 0.5rem 2rem;

  color: #fff;
  font-weight: bold;

  background-color: rgb(33, 156, 105);
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.5), 0 0 20px rgb(33, 156, 105);
  opacity: 1;

  transition: background-color 0.16s, color 0.16s, box-shadow 0.16s;

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

export const EmptyMessage = styled.div`
  z-index: 100500;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;
  color: white;

  background-color: rgba(0, 0, 0, 0.5);

  > p {
    max-width: 30rem;
    font-weight: bold;
    text-align: center;
  }
`;
