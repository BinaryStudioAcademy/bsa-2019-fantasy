import React from 'react';
import styled from 'styled-components';

const Container = styled.tr`
  z-index: 200;

  position: sticky;
  top: 0;
  width: 100%;
  height: 3rem;

  display: flex;

  font-size: 1rem;
  text-align: center;

  background-color: #eee;
  font-weight: bold;

  > td {
    height: 3rem;
  }
`;

type Props = {
  title: string;
};

const TeamListHeader = ({ title }: Props) => {
  return (
    <Container>
      <td className='w-1/12' />
      <td className='w-6/12 h-full text-left'>{title}</td>
      <td className='w-1/12' title='Position'>
        Pos
      </td>
      <td className='w-1/12' title='Goals'>
        G
      </td>
      <td className='w-1/12' title='Missed passes'>
        MS
      </td>
      <td className='w-1/12' title='Player score'>
        PTS
      </td>
      <td className='w-1/12' title='Red cards'>
        RC
      </td>
    </Container>
  );
};

export default TeamListHeader;
