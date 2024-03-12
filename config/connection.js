//Importing sequelize package
const Sequelize = require('sequelize');
//Importing the config method of dotenv package 
//to access process.env
require('dotenv').config();  
//Create a sequelize instance with the database connection details
const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{
host: 'localhost',    //host name
dialect: 'mysql',    
port: 3301,          //port number
});
module.exports = sequelize;    //Export the sequelize object