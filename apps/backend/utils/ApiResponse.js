class ApiResponse {
  constructor(
    statusCode = 200,
    message = "Success",
    data = null,
    success = true
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}

module.exports = ApiResponse;
