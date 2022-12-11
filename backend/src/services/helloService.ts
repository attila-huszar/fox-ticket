import Person from '../models/person';
import { NotFoundError, ParameterError } from '../errors';
import * as personRepo from '../repositories/personRepo';
import { HelloWorldResponse } from '../interfaces/helloWorld';

export async function getHelloWorld(personId: number): Promise<HelloWorldResponse> {
  if (personId < 0 || !Number.isInteger(personId)) {
    throw new ParameterError('Invalid personId');
  }

  const person = await personRepo.getPersonById(personId);

  if (person) {
    return { greeting: `Hello ${(person as Person).name}!` };
  } else {
    throw new NotFoundError();
  }
}
