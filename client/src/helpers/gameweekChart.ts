import { GameweekHistoryResultsType } from 'types/gameweekHistory.type';
import { GameweekType } from 'types/gameweek.type';

export const getChartOptions = (
  gameweeks: Array<GameweekType>,
  statistics: Array<GameweekHistoryResultsType>,
) => {
  const statisticsIds = [...statistics].map((s) => s.gameweek);

  return {
    labels: [
      ...gameweeks
        .filter((g) => statisticsIds.includes(g.id))
        .map((g) => `GW ${g.number}`),
    ],
    datasets: [
      {
        label: 'average point',
        fill: true,
        borderColor: '#1EE3CF',
        backgroundColor: 'rgba(30, 227, 207, 0.3)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: [...statistics.map((s) => (s.average ? s.average : 0))],
      },
      {
        label: 'max point',
        fill: true,
        borderColor: '#1EE3CF',
        backgroundColor: 'rgba(18, 39, 55, 0.678)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: [...statistics.map((s) => (s.max ? s.max : 0))],
      },
    ],
  };
};
