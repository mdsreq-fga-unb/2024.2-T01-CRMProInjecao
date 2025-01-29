import { DataSource, type DataSourceOptions } from 'typeorm';
require("dotenv").config();

const MODE = process.env.PG_MODE || 'dev';

const prodConfig = {
  ssl: {
    ca: process.env.DATABASE_SSL_CA,
    rejectUnauthorized: true,
  },
  synchronize: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
  },
};
console.log(parseInt(process.env.DATABASE_PORT, 10));
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  ...(MODE === 'prod' ? prodConfig : {}),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
