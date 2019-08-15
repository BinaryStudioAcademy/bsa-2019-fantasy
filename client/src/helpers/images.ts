export const preloadClubLogos = (clubs: any, size: 40 | 80 | 200) => {
  const logos = clubs.map(({ code }: { code: number }) => {
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
