import React, { useCallback, useState } from 'react';
import { feedback } from 'react-feedbacker';
import callWebApi from 'helpers/webApiHelper';

import randomWords from 'random-words';

const AdminPanel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selected, setSelected] = useState('Gameweek 1');

  const [newUserId, setNewUserId] = useState('');

  const [secure, setSecure] = useState('');

  const createTeamMembers = (squad) => {
    return squad.map((item, i) => ({
      player_id: item!.id,
      is_on_bench: i % 4 === 0,
      is_captain: i === 1,
      is_vice_captain: i === 2,
    }));
  };

  const createUser = useCallback(
    async (ev) => {
      ev.preventDefault();
      const request = {
        name,
        email,
        password,
      };
      try {
        const promise = await callWebApi({
          endpoint: '/api/auth/registration',
          type: 'POST',
          request,
        });
        const newUser = await promise.json();
        setNewUserId(newUser.user.id);
        setName('');
        setEmail('');
        setPassword('');
        setSelected('Gameweek 1');
        feedback.success('User has been created successufully!');
      } catch (err) {
        throw err;
      }
    },
    [name, email, password],
  );

  const setSquad = useCallback(
    async (ev) => {
      ev.preventDefault();
      try {
        const gameweeksPromise = await callWebApi({
          endpoint: '/api/gameweeks',
          type: 'GET',
        });
        const gameweeks = await gameweeksPromise.json();
        const { id: gameweekId } = gameweeks.find(
          (el) => el.number == selected.charAt(selected.length - 1),
        );

        const randomSquadPromise = await callWebApi({
          endpoint: 'api/players/random-squad',
          type: 'GET',
        });
        const randomSquad = await randomSquadPromise.json();

        const moneyRemaining =
          1000 - randomSquad.reduce((acc, curr) => acc + curr.player_price, 0);

        const userData = {
          team_name: randomWords(),
          money: moneyRemaining,
        };

        const teamMemberData = createTeamMembers(randomSquad);

        await callWebApi({
          endpoint: `/api/profile/${newUserId}/${gameweekId}`,
          type: 'PUT',
          request: { userData, teamMemberData },
        });
        feedback.success('Squad for Gameweek has been created successufully');
      } catch (err) {
        throw err;
      }
    },
    [selected, newUserId],
  );

  return (
    <React.Fragment>
      <div>
        <input
          type='text'
          className='border border-gray-600'
          value={secure}
          onChange={(ev) => setSecure(ev.target.value)}
        />
      </div>
      {secure === 'BSA-academy' && (
        <div className='m-auto'>
          <p className='text-3xl'>Create New User</p>
          <form className='flex flex-col mb-4' onSubmit={(ev) => createUser(ev)}>
            <input
              className='border mb-2 border-gray-600'
              type='text'
              placeholder='username'
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              className='border mb-2 border-gray-600'
              type='email'
              value={email}
              placeholder='email'
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              className='border mb-2 border-gray-600'
              type='password'
              value={password}
              placeholder='password'
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className='bg-blue-500' type='submit'>
              Create
            </button>
          </form>
          {newUserId && (
            <React.Fragment>
              <p className='text-3xl'>Choose Gameweek</p>
              <form className='flex flex-col' onSubmit={(ev) => setSquad(ev)}>
                <select
                  className='mb-2'
                  value={selected}
                  onChange={(ev) => setSelected(ev.target.value)}
                  onBlur={(ev) => setSelected(ev.target.value)}
                >
                  <option>Gameweek 1</option>
                  <option>Gameweek 2</option>
                  <option>Gameweek 3</option>
                  <option>Gameweek 4</option>
                  <option>Gameweek 5</option>
                  <option>Gameweek 6</option>
                  <option>Gameweek 7</option>
                  <option>Gameweek 8</option>
                  <option>Gameweek 9</option>
                  <option>Gameweek 10</option>
                  <option>Gameweek 11</option>
                  <option>Gameweek 12</option>
                  <option>Gameweek 13</option>
                  <option>Gameweek 14</option>
                  <option>Gameweek 15</option>
                  <option>Gameweek 16</option>
                  <option>Gameweek 17</option>
                  <option>Gameweek 18</option>
                  <option>Gameweek 19</option>
                  <option>Gameweek 20</option>
                  <option>Gameweek 21</option>
                  <option>Gameweek 22</option>
                  <option>Gameweek 23</option>
                  <option>Gameweek 24</option>
                  <option>Gameweek 25</option>
                  <option>Gameweek 26</option>
                  <option>Gameweek 27</option>
                  <option>Gameweek 28</option>
                  <option>Gameweek 29</option>
                  <option>Gameweek 30</option>
                  <option>Gameweek 31</option>
                  <option>Gameweek 32</option>
                  <option>Gameweek 33</option>
                  <option>Gameweek 34</option>
                  <option>Gameweek 35</option>
                  <option>Gameweek 36</option>
                  <option>Gameweek 37</option>
                  <option>Gameweek 38</option>
                </select>
                <button className='bg-blue-500' type='submit'>
                  AutoPick Squad
                </button>
              </form>
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default AdminPanel;
