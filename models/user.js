// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

//This method is used for authentication purposes, where a user's provided password is compared against the hashed password stored in the database to determine if the login attempt is valid.
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// User Table Model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Id field can't be null - must have a value. 
      primaryKey: true, 
      autoIncrement: true, //This specifies that the value of the id field will automatically increment with each new record inserted into the table. This is commonly used for primary keys to ensure each record has a unique identifier.
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // This connects to help hash passwords
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// Export
module.exports = User;
