import { Club } from 'types/club.type';

export const preloadClubLogos = (clubs: Club[], size: 40 | 80 | 200) => {
  const logos = clubs.map(({ code }) => {
    const img = new Image();
    img.src = `/images/club-logos/badge_${code}_${size}.png`;
    return img;
  });
};

export const getClubLogoUrl = (code: number, size: 40 | 80 | 200) => {
  return code ? `/images/club-logos/badge_${code}_${size}.png` : '';
};

export const getPlayerImageUrl = (code: number, size: 220 | 500) => {
  if (!code) return '';
  if (size === 220) return `/images/players/220x280/${code}.png`;
  if (size === 500) return `/images/players/500x500/${code}.png`;
  return '';
};

export const getFieldPlayersUniformUrl = (code: number) =>
  `/images/uniforms/field-players/shirt_${code}-66.png`;

export const getGoalkeepersUniformUrl = (code: number) =>
  `/images/uniforms/goalkeepers/shirt_${code}_1-66.png`;
