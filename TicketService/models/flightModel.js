const sequelize = require('../db')
const {DataTypes} = require("sequelize");

const Flight = sequelize.define('flight', {
    flight_serial: {  // ok
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    flight_id: {  // ok
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    origin: {  // ok
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {  // ok
        type: DataTypes.STRING,
        allowNull: false
    },
    aircraft: {  // ok
        type: DataTypes.STRING,
        allowNull: false
    },
    departure_utc: {  // ok
        type: DataTypes.DATE,
        allowNull: false
    },
    duration: {  // ok
        type: DataTypes.INTEGER,
        allowNull: false
    },
    y_price: {  // ok
        type: DataTypes.INTEGER,
        allowNull: false
    },
    j_price: {  // ok
        type: DataTypes.INTEGER,
        allowNull: false
    },
    f_price: {  // ok
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Flight.sync()

module.exports = Flight