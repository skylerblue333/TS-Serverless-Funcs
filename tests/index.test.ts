import request from 'supertest';
import { app } from '../src/index';

describe('TS-Serverless-Funcs', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('should deploy a function', async () => {
    const res = await request(app).post('/api/deploy').send({ name: 'image-resizer' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('deployed');
  });

});
