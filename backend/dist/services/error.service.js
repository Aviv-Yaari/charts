"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressError = void 0;
class ExpressError extends Error {
    constructor(customMessage, statusCode) {
        super();
        this.customMessage = customMessage;
        this.statusCode = statusCode;
    }
}
exports.ExpressError = ExpressError;
