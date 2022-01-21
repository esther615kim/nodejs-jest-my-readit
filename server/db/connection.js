const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config =
  ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

module.exports = new Pool();

// NODE_ENV=production DATABASE_URL= npm start

// postgres://cfzrqjbdlpzvbn:2efb6afbbb70422a968b02d3d65202ccae297e941bc5ed2c7f2b47348be88c97@ec2-54-83-152-251.compute-1.amazonaws.com:5432/d4n8lqsem0rf16