import playerMatchRepository from "../../data/repositories/player-match.repository";
import gameweekRepository from '../../data/repositories/gameweek.repository';
import gameRepository from '../../data/repositories/game.repository';
import eventRepository from '../../data/repositories/event.repository';

export const getAllPlayerMatch = async () =>
    await playerMatchRepository.getAll();

export const getPlayerMatchById = async id =>
    await playerMatchRepository.getById(id);

export const getPlayerStatsByGameweeks = async playerId => {

    const result = [];
    const gameweeks = await gameweekRepository.getAll().map(el => el.get({ plain: true }));
    
    gameweeks.map(async ({ id: gameweekId, name, number }) => {
        const games = await gameRepository.getByGameweekId(number).map(el => el.get({ plain: true }));

        games.map(async ({ id: gameId, start, hometeam, awayteam }) => {
            if(!gameId) return;

            const eventsForGame = await eventRepository.getByGameId(gameId).map(el => el.get({ plain: true }));
            const realEvents = eventsForGame.filter(ev => ev !== undefined);

            realEvents.map(console.log);
            // const stat = eventsForGame.filter(event => event.player.player_id === playerId)[0].player;
            // const stat = realEvents[0].player;

            // result.push({ gameweek: { name, number}, stat });
        })
    })

    // console.log(result);
    // gameweekRepository.getAll()
    //     .success(gameweeks => {
    //         gameweeks.map(gameweek => console.log(gameweek.values));
    //     })
    // const gameweeks = await gameweekRepository.getGameweekArray();
    // gameweeks.map(gameweek => {

    // })
    // console.log(gameweeks);

    // const playerMatchStats = await playerMatchRepository.getPlayerMathchStatsByPlayerId(id);

    // const result = 
    // playerMatchStats.map(stat => {

    // });
}