import { sequelize, Sequelize} from '../index';
import { hashPass } from '../../helpers/crypto';

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
    qAnswer: {
        type: Sequelize.STRING
    }
});

User.beforeCreate((user, options) => {
    if (!user.changed('password')) return;

    return hashPass(user.password).then((hash) => {
        user.password = hash;
    })
});

User.sync({ force: false });

export default User;