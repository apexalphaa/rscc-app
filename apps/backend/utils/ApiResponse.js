class ApiResponse {
    constructor(
        statusCode = 200,
        message = "Success",
        data = null,
        meta = {}
    ) {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
        this.timestamp = new Date().toISOString();
    }
}

export default ApiResponse;
