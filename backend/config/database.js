const mysql = require('mysql2/promise');

let connection;

const connectDB = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'vvd_project_management',
      charset: 'utf8mb4',
      timezone: '+00:00',
    });

    console.log('✅ MySQL Connected Successfully');
    return connection;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

const getConnection = () => {
  if (!connection) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return connection;
};

const closeConnection = async () => {
  if (connection) {
    await connection.end();
    console.log('🔌 Database connection closed');
  }
};

module.exports = {
  connectDB,
  getConnection,
  closeConnection,
};