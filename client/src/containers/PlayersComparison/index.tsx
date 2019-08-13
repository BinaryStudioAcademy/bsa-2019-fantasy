import React from 'react';
import PlayersHighlights from 'components/PlayersComparison/PlayersHighlights';

import CompareTable from 'components/PlayersComparison/CompareTable';

const PlayersComparisonPage = () => {
  const renderTable = (player: any) => {
    const columns = [
      {
        Header: () => <span className='table-title uppercase font-bold'>GW</span>,
        accessor: 'gameweekName',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>HTM</span>,
        accessor: 'hometeam',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>ATM</span>,
        accessor: 'awayteam',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>SCR</span>,
        accessor: 'playerScore',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>PRC</span>,
        accessor: 'playerPrice',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>GLS</span>,
        accessor: 'goals',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>ASTS</span>,
        accessor: 'assists',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>MSPS</span>,
        accessor: 'missedPasses',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>GLSCD</span>,
        accessor: 'goalsConceded',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>SVS</span>,
        accessor: 'saves',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>YCRDS</span>,
        accessor: 'yellowCards',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>RCRDS</span>,
        accessor: 'redCards',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
    ];

    return (
      <div className='table-wrapper flex flex-col bg-white shadow rounded my-4 w-full'>
        <CompareTable
          columns={columns}
          data={player.matches}
          title={player.firstName + ' ' + player.secondName}
        />
      </div>
    );
  };

  const data = [
    {
      firstName: 'Lucas',
      secondName: 'Digne',
      matches: [
        {
          gameweekName: 'GW1',
          hometeam: 'ARS',
          awayteam: 'BCN',
          playerScore: 3121,
          playerPrice: 421,
          goals: 1,
          assists: 2,
          missedPasses: 16,
          goalsConceded: 0,
          saves: 0,
          yellowCards: 1,
          redCards: 0,
        },
        {
          gameweekName: 'GW1',
          hometeam: 'DBA',
          awayteam: 'YAS',
          playerScore: 1221,
          playerPrice: 511,
          goals: 0,
          assists: 2,
          missedPasses: 11,
          goalsConceded: 0,
          saves: 0,
          yellowCards: 1,
          redCards: 0,
        },
        {
          gameweekName: 'GW2',
          hometeam: 'KXA',
          awayteam: 'OPA',
          playerScore: 221,
          playerPrice: 11,
          goals: 5,
          assists: 2,
          missedPasses: 7,
          goalsConceded: 0,
          saves: 0,
          yellowCards: 2,
          redCards: 1,
        },
      ],
    },
    {
      firstName: 'Mario',
      secondName: 'Balotelli',
      matches: [
        {
          gameweekName: 'GW1',
          hometeam: 'ARS',
          awayteam: 'BCN',
          playerScore: 3121,
          playerPrice: 421,
          goals: 1,
          assists: 2,
          missedPasses: 16,
          goalsConceded: 0,
          saves: 0,
          yellowCards: 1,
          redCards: 0,
        },
        {
          gameweekName: 'GW1',
          hometeam: 'DBA',
          awayteam: 'YAS',
          playerScore: 1221,
          playerPrice: 511,
          goals: 0,
          assists: 2,
          missedPasses: 11,
          goalsConceded: 0,
          saves: 0,
          yellowCards: 1,
          redCards: 0,
        },
        {
          gameweekName: 'GW2',
          hometeam: 'KXA',
          awayteam: 'OPA',
          playerScore: 221,
          playerPrice: 11,
          goals: 5,
          assists: 2,
          missedPasses: 7,
          goalsConceded: 0,
          saves: 0,
          yellowCards: 2,
          redCards: 1,
        },
      ],
    },
  ];

  return (
    <>
      <PlayersHighlights />

      <section className='footer-stats my-6'>
        <div className='footer-tables flex flex-wrap'>
          {data.map((player) => renderTable(player))}
        </div>
      </section>
    </>
  );
};

export default PlayersComparisonPage;
