import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import produce from 'immer';
import _ from 'lodash';

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
    volume: 0.7,
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
  stop: {
    name: 'stop',
    action: 'stop-all',
  },
};

type Sound = {
  name: string;
  action: 'start' | 'stop' | 'stop-all';
  src?: string;
  loop?: boolean;
  volume?: number;
  key?: string;
};

export const Sound = ({ currentEvent, isMuted }) => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const audioRef = useRef<any>(null);

  const stopSound = (sound) => {
    if (!sound) return;
    if (_.isString(sound)) {
      setSounds(produce((draft) => draft.filter((item) => item.src !== sound)));
      return;
    }
    setSounds(produce((draft) => draft.filter((item) => item.key !== sound.key)));
  };

  useEffect(() => {
    if (currentEvent) {
      const sound = eventSounds[currentEvent.name];
      if (!sound) return;
      switch (sound.action) {
        case 'start':
          setSounds([...sounds, { ...sound, key: Date.now() }]);
          return;
        case 'stop': {
          const instance = (window as any).Howler._howls.find(
            (item) => item.src === sound.src,
          );
          if (!instance) return;
          instance.once('fade', function() {
            stopSound(sound);
          });
          instance.fade(instance._volume, 0, 1000);
          return;
        }
        case 'stop-all': {
          const instances = (window as any).Howler._howls;
          instances.forEach((instance) => {
            instance.on('fade', function() {
              setSounds([]);
            });
            instance.fade(instance._volume, 0, 1000);
          });
          return;
        }
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
