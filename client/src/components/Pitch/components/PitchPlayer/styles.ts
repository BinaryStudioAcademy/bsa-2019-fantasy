import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: relative;

  height: 6rem;
  width: 7rem;

  overflow: hidden;

  transition: background-color 0.16s;
`;

export const Player = styled.div`
  position: relative;
  height: 100%;

  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`;

export const PlayerBadge = styled.div`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
`;

const spin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 0.5;
  }

  50% {
    transform: translate(-50%, -50%) rotate(180deg);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
    opacity: 0.5;
  }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;

  color: rgba(255, 255, 255, 0.4);
  font-size: 4rem;

  animation: ${spin} 5s infinite linear;
`;
