import Sequelize from 'sequelize';

const sequelize = new Sequelize('test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

export {
    sequelize,
    Sequelize
};

