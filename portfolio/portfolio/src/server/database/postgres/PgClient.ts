import Pool from 'pg-pool';
import url from 'url';
import { PRIVATE_PG_DATABASE_URL } from '$env/static/private';
import type { PoolClient } from 'pg';

const params = url.parse(PRIVATE_PG_DATABASE_URL);

const [user, password] = params.auth?.split(':') || [];
const [, database] = params.pathname?.split('/') || [];

const config = {
  user,
  password,
  host: params.hostname || 'localhost',
  port: Number(params.port) || 5432,
  database,
  ssl: false
};

export const pool = new Pool(config);
let connection: PoolClient;
export const getConnection = async () => {
  if (!connection) {
    connection = await pool.connect();
  }
  return connection;
};
