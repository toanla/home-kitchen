class ApiResponse {
    constructor(responseCode, message, data) {
        this.responseCode = responseCode;
        this.message = message;
        this.data = data
    }
}

export default ApiResponse;
