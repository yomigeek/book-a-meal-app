const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config.json')[env];
  
require('dotenv').config();


// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object
const db = {};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.meals = require('../models/allMeals')(sequelize, Sequelize);
db.admin = require('../models/userCustomers')(sequelize, Sequelize);
db.menu = require('../models/menu')(sequelize, Sequelize);
db.orders = require('../models/orders')(sequelize, Sequelize);
// Relations
db.admin.hasMany(db.meals);
db.meals.belongsTo(db.admin);
db.meals.belongsTo(db.menu, {
  foreignKey: 'mealId',
});
db.menu.hasMany(db.meals, {
  foreignKey: 'mealId',
});
db.meals.belongsToMany(db.menu, {
  through: 'mealId',
});

module.exports = db;
