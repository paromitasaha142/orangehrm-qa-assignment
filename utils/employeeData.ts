import { faker } from '@faker-js/faker';

export function newEmployee() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric({ length: 6, allowLeadingZeros: false }),
  };
}
