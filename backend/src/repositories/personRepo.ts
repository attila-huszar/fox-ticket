import Person from '../models/person';

export function getPersonById(id: number): Promise<Person | null> {
  return Person.findByPk(id);
}

export function createPerson(name: string): Promise<Person> {
  return Person.create({ name });
}
