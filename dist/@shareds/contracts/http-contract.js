"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.badRequestResponse = exports.BadRequestResponse = exports.errorResponse = exports.ErrorResponse = exports.HttpResponseTypeError = exports.HttpResponseType = void 0;
const axios_1 = require("axios");
class HttpResponseType {
    status;
    data;
    constructor(input) {
        Object.assign(this, input);
    }
}
exports.HttpResponseType = HttpResponseType;
class HttpResponseTypeError extends HttpResponseType {
    constructor(input) {
        super(input);
    }
}
exports.HttpResponseTypeError = HttpResponseTypeError;
class ErrorResponse extends HttpResponseTypeError {
    constructor(error) {
        super({
            status: axios_1.HttpStatusCode.InternalServerError,
            data: error.message,
        });
    }
}
exports.ErrorResponse = ErrorResponse;
const errorResponse = (error) => new ErrorResponse(error);
exports.errorResponse = errorResponse;
class BadRequestResponse extends HttpResponseTypeError {
    constructor(message) {
        super({
            status: axios_1.HttpStatusCode.BadRequest,
            data: message,
        });
    }
}
exports.BadRequestResponse = BadRequestResponse;
const badRequestResponse = (data) => new HttpResponseType({
    status: axios_1.HttpStatusCode.BadRequest,
    data,
});
exports.badRequestResponse = badRequestResponse;
const successResponse = (data) => new HttpResponseType({
    status: axios_1.HttpStatusCode.Ok,
    data,
});
exports.successResponse = successResponse;
