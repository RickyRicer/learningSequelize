const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Todo extends Model {}

Todo.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    // This column will store a reference of the 'id' of the 'user' that this Todo belongs to.
        authorId: {
            type: DataTypes.UUID,
            // This will create the connection between todo and user.
            references: {
                model: 'User',
            // Specify to sequelize which column in the User table this data refers to
            key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelNAme: 'Todo',
    }
);

module.exports = Todo;