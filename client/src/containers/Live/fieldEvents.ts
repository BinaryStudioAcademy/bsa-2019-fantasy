import attackRight from 'assets/images/attack-right.svg';
import attackLeft from 'assets/images/attack-left.svg';
import yellowCard from 'assets/images/yellow-card.svg';
import redCard from 'assets/images/red-card.svg';

const fieldEvents = [
  {
    name: 'shot',
    team: 'home',
    style: { top: '15%', left: '55%', width: '6rem' },
    direction: { left: true },
    img: attackRight,
  },
  {
    name: 'shot',
    team: 'away',
    style: { top: '15%', right: '55%', width: '6rem' },
    direction: { right: true },
    img: attackLeft,
  },
  {
    name: 'yellow-card',
    team: 'home',
    style: { top: '15%', left: '15%', width: '4rem' },
    direction: { down: true },
    img: yellowCard,
  },
  {
    name: 'yellow-card',
    team: 'away',
    style: { top: '15%', right: '15%', width: '4rem' },
    direction: { down: true },
    img: yellowCard,
  },
];

export default fieldEvents;
