export const getChartOptions = () => {
  return {
    labels: ['GW1', 'GW2', 'GW3', 'GW4', 'GW5', 'GW6', 'GW7'],
    datasets: [
      {
        label: 'points',
        fill: true,
        borderColor: '#1EE3CF',
        backgroundColor: 'rgba(30, 227, 207, 0.3)',
        pointHoverBackgroundColor: '#fff',
        pointHoverRadius: 7,
        data: [10, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
};
