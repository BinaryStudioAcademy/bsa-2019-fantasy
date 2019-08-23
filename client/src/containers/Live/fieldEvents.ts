import attack from 'assets/images/simulation/attack.svg';
import ball from 'assets/images/simulation/ball.svg';
import foul from 'assets/images/simulation/foul.svg';
import goal from 'assets/images/simulation/goal.svg';
import interceptionHome from 'assets/images/simulation/interception-home.svg';
import interceptionAway from 'assets/images/simulation/interception-away.svg';
import save from 'assets/images/simulation/save.svg';
import shoot from 'assets/images/simulation/shoot.svg';
import yellowCard from 'assets/images/simulation/yellow-card.svg';
import redCard from 'assets/images/red-card.svg';

const fieldEvents = [
  {
    name: 'attack',
    team: 'home',
    style: { top: '15%', left: '55%', width: '6rem' },
    direction: { left: true },
    img: attack,
  },
  {
    name: 'attack',
    team: 'away',
    style: { top: '15%', right: '55%', width: '6rem', transform: 'scale(-1, 1)' },
    direction: { left: true },
    img: attack,
  },
  {
    name: 'freeKick',
    team: 'home',
    style: { bottom: '36%', left: '63%', width: '1.4rem' },
    direction: { left: true },
    img: ball,
  },
  {
    name: 'freeKick',
    team: 'away',
    style: { bottom: '36%', right: '63%', width: '1.4rem' },
    direction: { right: true },
    img: ball,
  },
  {
    name: 'foul',
    team: 'home',
    style: { bottom: '2%', left: '30%', width: '4rem', transform: 'scale(-1, 1)' },
    direction: { left: true },
    img: foul,
  },
  {
    name: 'foul',
    team: 'away',
    style: { bottom: '2%', right: '30%', width: '4rem' },
    direction: { right: true },
    img: foul,
  },
  {
    name: 'cornerKick',
    team: 'home',
    style: { bottom: '13%', left: '5%', width: '1.5rem' },
    direction: { left: true },
    img: ball,
  },
  {
    name: 'cornerKick',
    team: 'away',
    style: { bottom: '13%', right: '5%', width: '1.5rem' },
    direction: { right: true },
    img: ball,
  },
  {
    name: 'penalty',
    team: 'home',
    style: { bottom: '13%', left: '5%', width: '1.5rem' },
    direction: { left: true },
    img: ball,
  },
  {
    name: 'penalty',
    team: 'away',
    style: { bottom: '13%', right: '5%', width: '1.5rem' },
    direction: { right: true },
    img: ball,
  },
  {
    name: 'goal',
    team: 'home',
    style: { top: '20%', right: '8%', width: '2.7rem' },
    direction: { left: true },
    img: goal,
  },
  {
    name: 'goal',
    team: 'away',
    style: { top: '20%', left: '8%', width: '2.7rem', transform: 'scale(-1, 1)' },
    direction: { right: true },
    img: goal,
  },
  {
    name: 'goalKick',
    team: 'home',
    style: {
      bottom: '36%',
      left: '17%',
      width: '1.3rem',
    },
    direction: { left: true },
    img: ball,
  },
  {
    name: 'goalKick',
    team: 'away',
    style: {
      bottom: '36%',
      left: '17%',
      width: '1.3rem',
    },
    direction: { right: true },
    img: ball,
  },
  {
    name: 'interception',
    team: 'home',
    style: { top: '15%', left: '23%', width: '6rem' },
    direction: { left: true },
    img: interceptionHome,
  },
  {
    name: 'interception',
    team: 'away',
    style: { top: '15%', right: '23%', width: '6rem' },
    direction: { right: true },
    img: interceptionAway,
  },
  {
    name: 'miss',
    team: 'home',
    style: {
      top: '32%',
      right: '0%',
      width: '3.5rem',
      transform: 'scale(1,-1)',
    },
    direction: { left: true },
    img: shoot,
  },
  {
    name: 'miss',
    team: 'away',
    style: {
      top: '32%',
      left: '0%',
      width: '3.5rem',
      transform: 'scale(-1,-1)',
    },
    direction: { right: true },
    img: shoot,
  },
  {
    name: 'save',
    team: 'home',
    style: { top: '31%', left: '11%', width: '1.8rem' },
    direction: { left: true },
    img: save,
  },
  {
    name: 'save',
    team: 'away',
    style: { top: '31%', right: '11%', width: '1.8rem', transform: 'scale(-1, 1)' },
    direction: { right: true },
    img: save,
  },
  {
    name: 'shot',
    team: 'home',
    style: { top: '25%', left: '60%', width: '4rem' },
    direction: { left: true },
    img: shoot,
  },
  {
    name: 'shot',
    team: 'away',
    style: { top: '25%', right: '60%', width: '4rem', transform: 'scale(-1, 1)' },
    direction: { right: true },
    img: shoot,
  },
  {
    name: 'yellowCard',
    team: 'home',
    style: { bottom: '0', left: '30%', width: '4rem' },
    direction: { down: true },
    img: yellowCard,
  },
  {
    name: 'yellowCard',
    team: 'away',
    style: { bottom: '0', right: '30%', width: '4rem', transform: 'scale(-1, 1)' },
    direction: { down: true },
    img: yellowCard,
  },
];

export default fieldEvents;
