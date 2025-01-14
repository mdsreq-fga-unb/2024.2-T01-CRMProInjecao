import { DataSource, type DataSourceOptions } from 'typeorm';
import 'dotenv/config';

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
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ...(MODE === 'prod' ? prodConfig : { synchronize: true }),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
