import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import produce from 'immer';

const eventSounds = {
  startGame: {
    name: 'crowdLoop',
    action: 'start',
    src: '/sounds/crowd-loop.ogg',
    loop: true,
    volume: 0.1,
  },
  startTime: {
    name: 'startTime',
    action: 'start',
    src: '/sounds/start-time.ogg',
    loop: false,
    volume: 0.4,
  },
  endTime: {
    name: 'endTime',
    action: 'start',
    src: '/sounds/end-time.ogg',
    loop: false,
    volume: 0.4,
  },
  goal: {
    name: 'goal',
    action: 'start',
    src: '/sounds/goal.ogg',
    loop: false,
    volume: 0.5,
  },
  shot: {
    name: 'shot',
    action: 'start',
    src: '/sounds/shot.ogg',
    loop: false,
    volume: 0.5,
  },
  save: {
    name: 'save',
    action: 'start',
    src: '/sounds/save.ogg',
    loop: false,
    volume: 0.4,
  },
  interception: {
    name: 'interception',
    action: 'start',
    src: '/sounds/save.ogg',
    loop: false,
    volume: 0.5,
  },
  miss: {
    name: 'miss',
    action: 'start',
    src: '/sounds/miss.ogg',
    loop: false,
    volume: 0.25,
  },
  foul: {
    name: 'foul',
    action: 'start',
    src: '/sounds/whistle.ogg',
    loop: false,
    volume: 0.05,
  },
  freeKick: {
    name: 'freeKick',
    action: 'start',
    src: '/sounds/whistle.ogg',
    loop: false,
    volume: 0.05,
  },
  cornerKick: {
    name: 'cornerKick',
    action: 'start',
    src: '/sounds/whistle.ogg',
    loop: false,
    volume: 0.05,
  },
  penaltyKick: {
    name: 'penaltyKick',
    action: 'start',
    src: '/sounds/whistle.ogg',
    loop: false,
    volume: 0.05,
  },
  endGame: {
    name: 'crowdLoop',
    action: 'stop',
  },
};

type Sound = {
  name: string;
  action: 'start' | 'stop';
  src?: string;
  loop?: boolean;
  volume?: number;
  key?: string;
};

export const Sound = ({ currentEvent, isMuted }) => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const audioRef = useRef<any>(null);

  const stopSound = (sound) => {
    console.log(`stop sound ${sound.name}`);
    setSounds(produce((draft) => draft.filter((item) => item.key !== sound.key)));
  };

  useEffect(() => {
    console.log(sounds);
    if (currentEvent) {
      const sound = eventSounds[currentEvent.name];
      if (!sound) return;
      console.log(`${sound.action} - ${sound.name}`);
      switch (sound.action) {
        case 'start':
          setSounds([
            ...sounds,
            { ...sound, key: `${currentEvent.elapsed}-${currentEvent.name}` },
          ]);
          return;
        case 'stop':
          const instance = (window as any).Howler._howls.find(
            (item) => item.src === sound.src,
          );
          instance.once('fade', function() {
            stopSound(sound);
          });
          instance.fade(instance._volume, 0, 1000);
          return;
      }
    }
  }, [currentEvent]);

  const onEnd = (sound) => () => {
    sound.loop || stopSound(sound);
  };

  return (
    <>
      {sounds.map((sound) => (
        <ReactHowler
          ref={audioRef}
          key={`${sound.key}`}
          src={sound.src}
          playing={true}
          loop={sound.loop}
          volume={sound.volume}
          mute={isMuted}
          onEnd={onEnd(sound)}
        />
      ))}
    </>
  );
};
