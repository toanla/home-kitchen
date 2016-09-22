import express from 'express';
import logger from 'winston';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../app/routes';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');

app.use('/api', routes);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var _send = res.send;
    var sent = false;
    res.send = function(data) {
        if (sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});

export default app;
