import styled from 'styled-components';

import { appear } from 'components/TeamSelection/styles';

import pitchBg from './field.svg';

export const Container = styled.div`
  flex: 1 0;
  width: 100%;

  position: relative;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: border-box center/100% 100% url(${pitchBg}) no-repeat;
  animation: ${appear} 0.32s;
`;

export const TeamRow = styled.div`
  display: flex;
  justify-content: space-around;

  > div {
    margin: 0 0.5rem;
  }
`;
