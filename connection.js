const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',         
    database: 'postgres', 
    password: '123',  
    port: 5432,                 
  });

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
    } else {
      client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Connection successful:', result.rows);
        }
      });
    }
  });
module.exports = pool;
  
