import styled from 'styled-components';

import { appear } from 'components/TeamSelection/styles';

export const Container = styled.table`
  margin-top: 2rem;
  position: relative;
  overflow: auto;

  flex: 1 0;
  height: 100%;
  width: 82%;

  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;

  font-size: 0.9rem;
  text-align: center;

  background-color: #fff;
  animation: ${appear} 0.32s;

  tr {
    flex: 1 0;
    border-bottom: 1px solid #ddd;
  }

  td {
    padding: 0.75rem;
  }
`;

export const HeaderShadow = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  margin-bottom: -3rem;
`;
