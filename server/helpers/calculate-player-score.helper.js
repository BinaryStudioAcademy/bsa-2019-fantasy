const calculatePlayerScore = ({
  goals,
  assists,
  missed_passes,
  goals_conceded,
  saves,
  yellow_cards,
  red_cards,
}) => {
  console.log(goals);
  let score = 0;
  score += goals * 8;
  score += assists * 6;
  score += saves * 6;
  score -= missed_passes * 2;
  score -= yellow_cards * 3;
  score -= red_cards * 6;
  score -= goals_conceded * 6;
  return score;
};

export default calculatePlayerScore;
