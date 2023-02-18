const sequelize = require('../db')
const {DataTypes} = require("sequelize");

const Purchase = sequelize.define('purchase', {
    corresponding_user_id: {  // ok
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 1
    },
    title: {  // ok
        type: DataTypes.STRING,
        // allowNull: false
    },
    first_name: { // ok
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {  // ok
        type: DataTypes.STRING,
        allowNull: false
    },
    flight_serial: {  // ok
        type: DataTypes.INTEGER,
        // references: {
        //   model: "flight",
        //   key: ""
        // },
        allowNull: false,
        default: 123
    },
    offer_price: {  // ok
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1000  // attention
    },
    offer_class: {  // ok
        type: DataTypes.CHAR,
        allowNull: false,
        default: 'F'  // attention
    },
    transaction_id: { // ok
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        default: false
    },
    transaction_result: { // ok
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 0
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Purchase.sync()

module.exports = Purchase