import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Inbox } from './inbox/inbox.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Inbox],
  migrations: ['dist/migrations/*.js'],
});

export default AppDataSource;
