import { LoggerDouble } from '../../../src/shared/logger/test';
import { container, initDI } from '../../inversify.dependencies';
import { initAPI, initDB } from '../../initializations';
import { DatabaseTestClient } from '../helpers';
import * as http from 'http';
import mongoose from 'mongoose';
import { MODULE_TYPES } from '../../constants';
import { Logger } from '@shared/logger';

const DB_NAME = 'fintonictest';

export class IntegrationEnviroment {
  private dbClient?: DatabaseTestClient;
  private db?: typeof mongoose | void;
  private api?: http.Server;

  constructor() {
    process.env['ENVIROMENT'] = 'test';
    process.env['DB_NAME'] = DB_NAME;

    this.initDI();
  }

  async setup() {
    const db = await this.initDB();
    const client = await this.initClient();
    await this.initAPI();
    await this.clearDB();
    return { client, db };
  }

  getAPI() {
    return this.initAPI();
  }

  getDBClient() {
    return this.initClient();
  }

  async clearDB() {
    await mongoose.connection.dropDatabase();
  }

  async tearDown() {
    await this.clearDB();
    mongoose.connection.close();
    if (this.api) await this.api.close();
  }

  private async initDB() {
    if (this.db) return this.db;
    const logger = new LoggerDouble();
    const db = await initDB(logger);
    this.db = db;
    return db;
  }

  private async initClient() {
    if (this.dbClient) return this.dbClient;
    const client = new DatabaseTestClient();
    this.dbClient = client;
    return client;
  }

  private initAPI() {
    if (this.api) return this.api;
    const api = initAPI(container);
    this.api = api;
    return api;
  }

  private initDI() {
    initDI();

    // Logger
    const logger = new LoggerDouble();
    container.unbind(MODULE_TYPES.SHARED.Logger);
    container.bind<Logger>(MODULE_TYPES.SHARED.Logger).toConstantValue(logger);
  }
}
