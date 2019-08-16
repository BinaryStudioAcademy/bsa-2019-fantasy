import React, { useState } from 'react';

import TeamSelection from 'components/Gameweek/TeamSelection';
import './styles.scss';
import StatusPlayerModal from 'components/StatusPlayerModal';

const MyTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [isCaptain, setIsCaptain] = useState(false);
  const [isViceCaptain, setIsViceCaptain] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [captainId, setCaptainId] = useState('');
  const [viceCaptainId, setViceCaptainId] = useState('');

  const onToggle = (show: boolean) => {
    setShowModal(show);
  };

  const onSetCaptain = () => {
    if (currentId === viceCaptainId) {
      setViceCaptainId(captainId);
      setCaptainId(currentId);
    } else {
      setCaptainId(currentId);
    }
    setShowModal(false);
  };

  const onSetViceCaptain = () => {
    if (currentId === captainId) {
      setCaptainId(viceCaptainId);
      setViceCaptainId(currentId);
    } else {
      setViceCaptainId(currentId);
    }
    setShowModal(false);
  };

  const onOpen = (id: string, isCaptain: boolean, isViceCaptain: boolean) => {
    setShowModal(true);
    setCurrentId(id);
    setIsCaptain(isCaptain);
    setIsViceCaptain(isViceCaptain);
  };

  return (
    <div className='team-page'>
      <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
        <div className='jumbotron-content mt-16'>
          <h2 className='title text-secondary mb-6'>
            <div className='sub title mb-4 flex items-center'>Team Page</div>
            My Team
          </h2>
        </div>
      </div>
      <TeamSelection
        isGameweek={false}
        onOpen={onOpen}
        captainId={captainId}
        viceCaptainId={viceCaptainId}
      />
      {showModal && (
        <StatusPlayerModal
          isCaptain={isCaptain}
          isViceCaptain={isViceCaptain}
          onClose={onToggle}
          onSetCaptain={onSetCaptain}
          onSetViceCaptain={onSetViceCaptain}
        />
      )}
    </div>
  );
};

export default MyTeam;
