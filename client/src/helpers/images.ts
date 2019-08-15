export const getClubLogoUrl = (code: number, size: 40 | 80 | 200) =>
  `/images/club-logos/badge_${code}_${size}.png`;

export const getFieldPlayersUniformUrl = (code: number) =>
  `/images/uniforms/field-players/shirt_${code}-66.png`;

export const getGoalkeepersUniformUrl = (code: number) =>
 `/images/uniforms/goalkeepers/shirt_${code}_1-66.png`;
