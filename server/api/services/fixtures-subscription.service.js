import fixturesSubscriptionRepository from '../../data/repositories/fixtures-subscription.repository';

export const createSubscription = async (data) => {
  return fixturesSubscriptionRepository.addSubscription(data);
};

export const findSubscription = async (userId) => {
  return fixturesSubscriptionRepository.getByUserId(userId);
};

export const deleteSubscription = async (userId, gameId) => {
  return fixturesSubscriptionRepository.deleteByUserAndGameId(userId, gameId);
};
