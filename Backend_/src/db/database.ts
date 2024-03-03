import { Pool, QueryResult, QueryResultRow } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
//The Pool class from the pg library is used to create a pool of database connections. This helps manage multiple client connections to the database efficiently.
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'trendhub',
//   password: process.env.PASSWORD,
//   port: 5432,
// });
const connectionString = 'postgres://trendhub_user:wUM4j8OFEdus6XId1YTA8onSRofDMwHn@dpg-cni6bqgl6cac7396987g-a.oregon-postgres.render.com/trendhub';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // For self-signed certificates
    },
});
// we will give query fxn a SQL query, it runs the sql query on the database, and query fxn gives you back the result when it's done, all handled asynchronously.
const query = async <T extends QueryResultRow>(text: string, params: any[] = []): Promise<QueryResult<T>> => {
  return await pool.query<T>(text, params);
};

export default query;


//  const logTables = async () => {
//   try {
//     const queryResult = await query(`
//     SELECT column_name, data_type
//     FROM information_schema.columns
//     WHERE table_name = 'wishlist';
    
  
    
//     `);

//     console.log('Data from the table:');
//     queryResult.rows.forEach(row => {
//       console.log(row);
//     });
//   } catch (error) {
//     console.error('Error fetching tables:', error);
//   } finally {
//     pool.end(); // Close the pool when done
//   }
// };

// logTables();




// const createTableQuery = `
// ALTER TABLE product
// ADD COLUMN image_id VARCHAR(255)


// `;


// const createTable = async () => {
//     try {
//         const result = await query(createTableQuery);
//         console.log('Table created successfully:', result);
//     } catch (error) {
//         console.error('Error creating table:', error);
//     } finally {
//         pool.end(); // Close the pool when done
//     }
// };

// createTable();