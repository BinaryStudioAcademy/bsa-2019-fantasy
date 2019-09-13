/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import PlayersHighlights from 'components/PlayersComparison/PlayersHighlights';

import CompareTable from 'components/PlayersComparison/CompareTable';
import { Redirect } from 'react-router';

interface MatchStatsI {
  gameweekName: string;
  opp: string;
  res: string;
  goals: string;
  assists: string;
  interceptions: string;
  goals_conceded: string;
  saves: string;
  yellow_cards: string;
  red_cards: string;
}

interface PropsI {
  location?: any;
}

const PlayersComparisonPage: React.FC<PropsI> = (props: PropsI) => {
  useEffect(() => {
    document.title = 'Players Comparison | Fantasy Football League';
  }, []);

  if (!props.location.state) return <>{<Redirect to='/404' />}</>;

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
        Header: () => <span className='table-title uppercase font-bold'>OPP</span>,
        accessor: 'opp',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>RES</span>,
        accessor: 'res',
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
        Header: () => <span className='table-title uppercase font-bold'>INS</span>,
        accessor: 'interceptions',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>GLSCD</span>,
        accessor: 'goals_conceded',
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
        accessor: 'yellow_cards',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
      {
        Header: () => <span className='table-title uppercase font-bold'>RCRDS</span>,
        accessor: 'red_cards',
        Cell: (props: { value: string }) => (
          <span className='flex justify-center items-center'>{props.value}</span>
        ),
      },
    ];

    return (
      <div className='table-wrapper flex flex-col bg-white shadow-figma rounded my-4 w-full'>
        <CompareTable
          columns={columns}
          data={player.matches}
          title={player.firstName + ' ' + player.secondName}
        />
      </div>
    );
  };

  const firstPlayer = props.location.state.comparisonData[0];
  const secondPlayer = props.location.state.comparisonData[1];
  const firstPlayerMatches: MatchStatsI[] = [];
  const secondPlayerMatches: MatchStatsI[] = [];

  firstPlayer.gameweeks_stats.forEach((stats: any) => {
    firstPlayerMatches.push({
      gameweekName: stats.gameweek.number,
      opp: stats.game.opp,
      res: stats.game.res,
      goals: stats.stats.goals,
      assists: stats.stats.assists,
      interceptions: stats.stats.missed_passes,
      goals_conceded: stats.stats.goals_conceded,
      saves: stats.stats.saves,
      yellow_cards: stats.stats.yellow_cards,
      red_cards: stats.stats.red_cards,
    });
  });

  firstPlayerMatches.sort((a, b) => Number(a.gameweekName) - Number(b.gameweekName));

  secondPlayer.gameweeks_stats.forEach((stats: any) => {
    secondPlayerMatches.push({
      gameweekName: stats.gameweek.number,
      opp: stats.game.opp,
      res: stats.game.res,
      goals: stats.stats.goals,
      assists: stats.stats.assists,
      interceptions: stats.stats.missed_passes,
      goals_conceded: stats.stats.goals_conceded,
      saves: stats.stats.saves,
      yellow_cards: stats.stats.yellow_cards,
      red_cards: stats.stats.red_cards,
    });
  });

  secondPlayerMatches.sort((a, b) => Number(a.gameweekName) - Number(b.gameweekName));

  const tableData = [
    {
      firstName: firstPlayer.first_name,
      secondName: firstPlayer.second_name,
      matches: [...firstPlayerMatches],
    },
    {
      firstName: secondPlayer.first_name,
      secondName: secondPlayer.second_name,
      matches: [...secondPlayerMatches],
    },
  ];

  return (
    <>
      <PlayersHighlights comparisonData={props.location.state.comparisonData} />

      <section className='footer-stats my-6'>
        <div className='footer-tables flex flex-wrap'>
          {tableData.map((player) => renderTable(player))}
        </div>
      </section>
    </>
  );
};

export default PlayersComparisonPage;
