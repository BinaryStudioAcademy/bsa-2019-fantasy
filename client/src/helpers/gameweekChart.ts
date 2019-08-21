import { GameweekType } from 'types/gameweek.type';
import { GameweekHistoryResultsType } from 'types/gameweekHistory.type';

export const getChartOptions = (
  gameweeks: Array<GameweekType>,
  statistics: Array<GameweekHistoryResultsType>,
) => {
  return {
    labels: [...gameweeks.map((gw) => `GW ${gw.number}`)],
    datasets: [
      {
        label: 'average point',
        fill: true,
        borderColor: '#1EE3CF',
        backgroundColor: 'rgba(30, 227, 207, 0.3)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: [...statistics.map((s) => (s.averageScore ? s.averageScore : 0))],
      },
      {
        label: 'max point',
        fill: true,
        borderColor: '#1EE3CF',
        backgroundColor: 'rgba(18, 39, 55, 0.678)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: [...statistics.map((s) => (s.maxScore ? s.maxScore : 0))],
      },
    ],
  };
};
