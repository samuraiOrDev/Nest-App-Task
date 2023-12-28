import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/seed (GET)', () => {
    return request(app.getHttpServer()).get('/seed').expect(200).expect({
      msg: 'ok',
      seed: 'Los datos de prueba se han insertado correctamente',
    });
  });
  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body.tasks.length).toBeGreaterThan(0);
      });
  });
  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({title: 'Tarea de prueba', description: 'Descripción de prueba'})
      .expect(201)
      .expect((res) => {
        expect(res.body.task.title).toEqual('Tarea de prueba');
      });
  });
  /* --------  */
});
