import { Pool, QueryResult, QueryResultRow } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
//The Pool class from the pg library is used to create a pool of database connections. This helps manage multiple client connections to the database efficiently.
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TrendHub',
  password: process.env.PASSWORD,
  port: 5432,
});
// we will give query fxn a SQL query, it runs the sql query on the database, and query fxn gives you back the result when it's done, all handled asynchronously.
const query = async <T extends QueryResultRow>(text: string, params: any[] = []): Promise<QueryResult<T>> => {
  return await pool.query<T>(text, params);
};

export default query;