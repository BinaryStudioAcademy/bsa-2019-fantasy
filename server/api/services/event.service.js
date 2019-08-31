/* eslint-disable no-return-await */
import eventRepository from '../../data/repositories/event.repository';

export const getAllEvents = async () => await eventRepository.getAll();

export const getEventById = async (id) => await eventRepository.getById(id);

export const getLastUpdatedEvent = async () => await eventRepository.getLastUpdated();

export const getEventByGameId = async (matchId) =>
  await eventRepository.getByGameId(matchId);
