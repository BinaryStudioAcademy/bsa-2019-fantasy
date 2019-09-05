import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import Modal from 'containers/Modal';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';

import * as gameweekService from 'services/gameweekService';
import moment from 'moment';

export const RescheduleModal = ({ onDismiss }) => {
  const [gameweek, setGameweek] = useState('1');
  const [fixturesList, setFixturesList] = useState();
  const [fixture, setFixture] = useState();
  const [dateTime, setDateTime] = useState();

  const gameweekOptions = [...Array(38).keys()].map((item) => String(item + 1));
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    gameweekService.getGamesById(gameweek).then((res) => setFixturesList(res));
  }, [gameweek]);

  const fixturesOptions =
    fixturesList &&
    fixturesList.map((fixture) => ({
      label: `${fixture.hometeam.name} - ${fixture.awayteam.name}`,
      value: fixture.id,
    }));

  return (
    <Modal onDismiss={onDismiss}>
      <div className='p-8'>
        <h3 className='font-bold text-2xl mb-4'>Reschedule match</h3>
        <div className='flex -mx-2 mb-8'>
          <div className='px-2'>
            <div className='font-semibold text-l'>Gameweek</div>
            <Dropdown
              options={gameweekOptions}
              value={gameweek}
              onChange={({ value }) => {
                setGameweek(value);
              }}
            ></Dropdown>
          </div>
          <div className='w-64 px-2'>
            <div className='font-semibold text-l'>Game</div>
            {fixturesOptions && (
              <Dropdown
                options={fixturesOptions}
                value={fixture}
                onChange={({ value }) => {
                  setFixture(value);
                  setDateTime(
                    moment(fixturesList.find((item) => item.id === value).start),
                  );
                }}
              ></Dropdown>
            )}
          </div>
          <div className=' px-2'>
            <div className='font-semibold text-l'>Time</div>
            <Datetime
              value={dateTime}
              dateFormat='MMMM Do YYYY'
              timeFormat='H:mm'
              onChange={(value) => setDateTime(value)}
            />
          </div>
        </div>
        <div className=''>
          <Button className='mr-4 text-sm' styling='primary' onClick={() => false}>
            Reschedule
          </Button>
          <Button className='text-sm' styling='secondary' onClick={onDismiss}>
            Dismiss
          </Button>
        </div>
      </div>
    </Modal>
  );
};
