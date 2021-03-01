import supertest from 'supertest';
import { app } from './';

// TODO Define Mock strategy
describe('API', () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  afterEach(() => {
    jest.resetAllMocks().restoreAllMocks();
  });

  describe('GET', () => {
    test(`should return '{ok: true}' when hitting '/' route`, (done) => {
      request
        .get('/')
        .expect(200)
        .expect(({ ok }) => {
          expect(ok).toBe(true);
        })
        .end(done);
    });
  });
});
