import styled from 'styled-components';

import { appear } from 'components/TeamSelection/styles';

import pitchBg from './field.svg';

export const Container = styled.div`
  z-index: 2000;
  position: relative;

  flex: 1 0;
  width: 100%;
  justify-content: center;

  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  animation: ${appear} 0.32s;
`;

export const TeamRow = styled.div`
  margin-top: 1rem;

  display: flex;
  justify-content: space-around;

  font-size: 1rem;

  > div {
    margin: 0 0.5rem;
  }
`;

export const Pitch = styled.div`
  /* flex: 1 0; */

  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: visible;

  background-image: url(${pitchBg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  background-clip: border-box;
`;

export const Bench = styled(TeamRow)`
  margin-top: 0;

  font-size: 0.9rem;

  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 15px rgba(30, 227, 207, 0.1);
`;
