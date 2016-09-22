import app from './config/app';
import config from './config/env';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import winston from 'winston'

const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new(winston.Logger)({
    transports: [
        // colorize the output to the console
        new(winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true
        })
    ]
});

logger.info("Server is running");

// listen on port config.port

// listen on port config.port
app.listen(config.default.port, () => {
    logger.info(`server started on port ${config.default.port} (${config.default.env})`);
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Invalid api call');
    err.response_code = 3,
        err.status = 404;
    next(err);
});

if (config.default.env === 'dev') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            response_code: err.responseCode,
            message: err.message,
            error: err
        })
    });
}

// production error handler
app.use(function(err, req, res, next) {
    logger.error(err);
    res.status(err.status || 500);
    res.json({
        response_code: err.responseCode,
        message: err.message
    })
});


// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(config.default.db, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.db}`);
});

export default app;
