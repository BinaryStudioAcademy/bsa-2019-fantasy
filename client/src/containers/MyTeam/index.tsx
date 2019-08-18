import React, { useState, useEffect } from 'react';

import TeamSelection from 'components/Gameweek/TeamSelection';
import './styles.scss';
import StatusPlayerModal from 'components/StatusPlayerModal';

const MyTeam = () => {

  const [showModal, setShowModal] = useState(false);

  const [isCaptain, setIsCaptain] = useState(false);
  const [isViceCaptain, setIsViceCaptain] = useState(false);

  const [currentId, setCurrentId] = useState('');
  const [currentName, setCurrentName] = useState('');

  const [captainId, setCaptainId] = useState('');
  const [viceCaptainId, setViceCaptainId] = useState('');

  const onClose = () => {
    setShowModal(false);
  };

  const onSetCaptain = () => {
    if (currentId === viceCaptainId) {
      setViceCaptainId(captainId);
    }
    setCaptainId(currentId);
    setShowModal(false);
  };

  const onSetViceCaptain = () => {
    if (currentId === captainId) {
      setCaptainId(viceCaptainId);
    }
    setViceCaptainId(currentId);
    setShowModal(false);
  };

  const onOpen = (
    id: string,
    isCaptain: boolean,
    isViceCaptain: boolean,
    name: string,
  ) => {
    setShowModal(true);
    setCurrentId(id);
    setCurrentName(name);
    setIsCaptain(isCaptain);
    setIsViceCaptain(isViceCaptain);
  };

  useEffect(() => {
    document.title = 'My Team | Fantasy Football League';
  }, []);


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
      <div className='p-3'>
      <TeamSelection
        isGameweek={false}
        onOpen={onOpen}
        captainId={captainId}
        viceCaptainId={viceCaptainId}
      />
      </div>
      {showModal && (
        <StatusPlayerModal
          isCaptain={isCaptain}
          isViceCaptain={isViceCaptain}
          onClose={onClose}
          onSetCaptain={onSetCaptain}
          onSetViceCaptain={onSetViceCaptain}
          name={currentName}
        />
      )}
    </div>
  );
};

export default MyTeam;
