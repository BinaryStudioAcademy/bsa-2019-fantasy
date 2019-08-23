import React from 'react';
export default function renderComment(event, state) {
  const { homeClub, awayClub } = state;
  const [home, away] = state.score;
  const { player, team } = event;
  const name = player ? `${player.first_name} ${player.second_name}` : '';
  const club = team ? (team === 'home' ? homeClub : awayClub) : undefined;

  switch (event.name) {
    case 'startGame':
      return (
        <>
          The match {homeClub && homeClub.name} - {awayClub && awayClub.name} started.
        </>
      );
    case 'endGame':
      return (
        <>
          The match {homeClub && homeClub.name} - {awayClub && awayClub.name} finished
          with score {home}:{away}.
        </>
      );
    case 'startTime':
      return <>Time {event.time} started.</>;
    case 'endTime':
      return (
        <>
          Time {event.time} ended with score {home}:{away}.
        </>
      );
    case 'attack':
      return (
        <>
          {player.position} {name} from {club.name} starts an attack.
        </>
      );
    case 'shot':
      return (
        <>
          {player.position} {name} shots.
        </>
      );
    case 'foul':
      return <>{name} gets a foul.</>;
    case 'goal':
      return (
        <>
          {name} from {club.name} scores!!! New score {home}:{away}.
        </>
      );
    case 'save':
      return <>Goalkeeper {name} saves a day.</>;
    case 'miss':
      return <>The ball goes off target.</>;
    case 'yellowCard':
      return <>{name} gets a yellow card.</>;
    case 'goalKick':
      return <>Time for a goal kick for {club.name}.</>;
    case 'cornerKick':
      return <>{name} will do the corner kick.</>;
    case 'freeKick':
      return (
        <>
          {player.position} {name} performs a free kick.
        </>
      );
    case 'penaltyKick':
      return <>Penaty kick! {name} will shoot at the gate.</>;
    case 'interception':
      return <>What a great interception from {name}.</>;
    case 'out':
      return <>Out from {club.name}</>;
    case 'nothing':
      return null;
    default:
      return <>{event.text}</>;
  }
}
