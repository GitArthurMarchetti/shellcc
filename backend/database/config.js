import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
     user: 'borges',
     host: 'localhost',
     database: 'shellcc',
     password: 'senai',
     port: 5432,
});

export default pool;
