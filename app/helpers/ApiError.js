import httpStatus from 'http-status';

class ExtendableError extends Error {
    constructor(responseCode, message, status, isPublic) {
        super(responseCode, message);
        this.name = this.constructor.name;
        this.responseCode = responseCode;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(this, this.constructor.name);
    }
}

class ApiError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} responseCode - CustomResponseCode.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(responseCode, message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
        super(responseCode, message, status, isPublic);
    }
}

export default ApiError;
