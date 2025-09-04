const fs = require('fs');
const path = require('path');
const { connectDB, closeConnection } = require('../config/database');

const runSeeds = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    const connection = await connectDB();
    
    // Read and execute seed data
    const seedPath = path.join(__dirname, '../database/seed.sql');
    const seedData = fs.readFileSync(seedPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = seedData.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }
    
    console.log('✅ Database seeded successfully');
    
    await closeConnection();
    console.log('🎉 Seeding completed successfully');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeds if this file is executed directly
if (require.main === module) {
  runSeeds();
}

module.exports = { runSeeds };