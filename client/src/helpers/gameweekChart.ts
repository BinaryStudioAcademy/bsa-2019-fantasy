import { GameweekHistoryResultsType } from 'types/gameweekHistory.type';
import { GameweekType } from 'types/gameweek.type';

export const getChartOptions = (
  gameweeks: GameweekType[],
  statistics: GameweekHistoryResultsType[],
  userPoints: any = [10, 59, 80, 81, 56, 55, 40],
  translation?: any,
) => {
  const statisticsIds = [...statistics].map((s) => s.gameweek);

  return {
    labels: [
      ...gameweeks
        .filter((g) => statisticsIds.includes(g.id))
        .map((g) => `${translation('GameweekHistoryPage.chart.GW')} ${g.number}`),
    ],
    datasets: [
      {
        label: translation('GameweekHistoryPage.chart.averagePoint'),
        fill: true,
        borderColor: '#1EE3CF',
        backgroundColor: 'rgba(30, 227, 207, 0.3)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: [...statistics.map((s) => (s.average ? s.average : 0))],
      },
      {
        label: translation('GameweekHistoryPage.chart.maxPoint'),
        fill: true,
        borderColor: '#1EE3CF',
        backgroundColor: 'rgba(18, 39, 55, 0.678)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: [...statistics.map((s) => (s.max ? s.max : 0))],
      },
      {
        label: translation('GameweekHistoryPage.chart.userPoint'),
        fill: false,
        borderColor: 'rgba(18, 39, 55, 0.678)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: userPoints,
      },
    ],
  };
};
