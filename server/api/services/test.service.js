import testRepository from '../../data/repositories/test.repository';

export const getTestValue = () => testRepository.getAll();

export const replaceTestValue = (newValue) => testRepository.replaceTestValue(newValue);
