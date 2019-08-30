import styled from 'styled-components';

import { appear } from 'components/TeamSelection/styles';

import pitchBg from './field.svg';

export const Container = styled.div`
  flex: 1 0;
  width: 100%;
  justify-content: center;

  position: relative;

  display: flex;
  flex-direction: column;

  animation: ${appear} 0.32s;
`;

export const TeamRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem 1rem;

  > div {
    margin: 0 0.5rem;
  }
`;

export const Pitch = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: border-box center/100% url(${pitchBg}) no-repeat;
`;

export const Bench = styled(TeamRow)`
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 15px rgba(30, 227, 207, 0.1);
`;
