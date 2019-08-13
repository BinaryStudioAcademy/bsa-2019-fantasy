const calculatePlayerPrice = (score, oldPrice) => {
  const K = 0.03;

  return oldPrice + score * K;
};

export default calculatePlayerPrice;
