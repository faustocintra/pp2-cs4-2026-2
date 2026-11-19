import assert from 'node:assert/strict';
import { once } from 'node:events';
import app from '../src/app.js';
import { prisma } from '../src/database/client.js';

// Usa o banco configurado e exclui somente o cliente temporário criado neste teste.
const server = app.listen(0, '127.0.0.1');
await once(server, 'listening');
const address = server.address();
assert(address && typeof address !== 'string');
const base = `http://127.0.0.1:${address.port}/customers`;
const tag = Date.now().toString();
let createdId: number | undefined;
async function request(path: string, method = 'GET', body?: unknown) {
  return fetch(base + path, { method, headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body) });
}
try {
  const payload = { name: 'Teste temporário CRUD', ident_document: tag,
    street_name: 'Rua de teste', house_number: '1', district: 'Centro',
    municipality: 'Franca', state: 'SP', phone: '16990000000', email: `crud-${tag}@example.com` };
  const post = await request('', 'POST', payload);
  assert.equal(post.status, 201);
  const customer = await post.json();
  createdId = customer.id;
  assert.equal((await prisma.customer.findUniqueOrThrow({ where: { id: createdId } })).email, payload.email);
  assert.equal((await request(`/${createdId}`)).status, 200);
  const all = await request('');
  assert.equal(all.status, 200);
  assert((await all.json()).some((row: { id: number }) => row.id === createdId));
  assert.equal((await request('', 'POST', payload)).status, 409);
  assert.equal((await request('', 'POST', {})).status, 400);
  const put = await request(`/${createdId}`, 'PUT', { name: 'Cliente atualizado' });
  assert.equal(put.status, 200);
  assert.equal((await put.json()).name, 'Cliente atualizado');
  assert.equal((await prisma.customer.findUniqueOrThrow({ where: { id: createdId } })).name, 'Cliente atualizado');
  const removed = await request(`/${createdId}`, 'DELETE');
  assert.equal(removed.status, 204);
  assert.equal(await removed.text(), '');
  assert.equal(await prisma.customer.findUnique({ where: { id: createdId } }), null);
  assert.equal((await request(`/${createdId}`)).status, 404);
  assert.equal((await request(`/${createdId}`, 'PUT', { name: 'Ausente' })).status, 404);
  assert.equal((await request(`/${createdId}`, 'DELETE')).status, 404);
  createdId = undefined;
  console.log('PASS: POST, GET, PUT, DELETE, persistência, duplicidade, entrada inválida e 404.');
} finally {
  if (createdId !== undefined) await prisma.customer.deleteMany({ where: { id: createdId } });
  await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  await prisma.$disconnect();
}
