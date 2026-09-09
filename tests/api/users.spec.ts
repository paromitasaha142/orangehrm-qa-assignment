import { test, expect } from '@playwright/test';

test('Part D - JSONPlaceholder Users API', async ({ request }) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

 
  const usersResponse = await request.get(`${baseUrl}/users`);

  expect(usersResponse.status()).toBe(200);

  const users = await usersResponse.json();

  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);

  for (const user of users) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');

    expect(user.id).toBeDefined();
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
  }

 
  const userId = users[0].id;

  expect(userId).toBeDefined();

  console.log('Selected User ID:', userId);

 
  const endpoint = `${baseUrl}/users/${userId}`;

  console.log('Endpoint:', endpoint);


  const userResponse = await request.get(endpoint);

  expect(userResponse.status()).toBe(200);

  const existingUser = await userResponse.json();

  expect(existingUser.id).toBe(userId);
  expect(existingUser.phone).toBeTruthy();

 
  const updatedName = `QA User ${Date.now()}`;
  const updatedEmail = `qa-${Date.now()}@example.com`;
  const updatedCompanyName = `QA Company ${Date.now()}`;

  const putResponse = await request.put(endpoint, {
    data: {
      name: updatedName,
      email: updatedEmail,
      company: {
        name: updatedCompanyName,
      },
    },
  });

  expect(putResponse.status()).toBe(200);

  const updatedUser = await putResponse.json();

  console.log('Updated User:', updatedUser);


  expect(updatedUser.id).toBe(userId);


  expect(updatedUser.name).toBe(updatedName);
  expect(updatedUser.email).toBe(updatedEmail);
  expect(updatedUser.company.name).toBe(updatedCompanyName);

 
expect(existingUser.phone).toBeTruthy();


if (updatedUser.phone !== undefined) {
  expect(updatedUser.phone).toBeTruthy();
}
});