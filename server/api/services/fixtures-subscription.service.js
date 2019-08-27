import fixturesSubscriptionRepository from '../../data/repositories/fixtures-subscription.repository';

export const createSubscription = async (data) => {
  return fixturesSubscriptionRepository.addSubscription(data);
};
