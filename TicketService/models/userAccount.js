const sequelize = require('../db')
const {DataTypes} = require("sequelize");

const UserAccount = sequelize.define('UserAccount', {
    user_id: {  // ok
        type: DataTypes.INTEGER,
        primaryKey: true,
        serial: true,
        allowNull: false
    },
    email: {  // ok
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone_number: {  // ok
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gender: {  // ok
        type: DataTypes.CHAR,
        allowNull: true
    },
    first_name: {  // ok
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {  // ok
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {  // ok
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});


module.exports = UserAccount