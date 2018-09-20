import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import { sequelize } from './db/index';
import routes from './routes';

const app = express();

app.set('views', path.join(__dirname, 'public/view'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.use((err, req, res, next) => {
    return res.status(500).send(err.message);
});

sequelize.authenticate().then(() => {
    app.listen(3000, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }

        console.log(`server is listening on 3000`)
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
