import styled from 'styled-components';

import { appear } from 'components/TeamSelection/styles';

export const Container = styled.table`
  position: relative;
  overflow-y: auto;

  height: 100%;
  width: 100%;

  padding-bottom: 1.5rem;
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
