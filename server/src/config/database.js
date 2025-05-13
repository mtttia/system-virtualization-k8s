// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, // or use 'mysql' if you're running in the same Kubernetes namespace
  dialect: 'mysql',
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    // Sync model with DB (not destructive)
    await sequelize.sync();
    console.log('Models synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
