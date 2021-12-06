"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const error_service_1 = require("../services/error.service");
const requireAuth = async (req, res, next) => {
    if (!req.session || !req.session.user) {
        next(new error_service_1.ExpressError('Not authenticated', 401));
    }
    next();
};
exports.requireAuth = requireAuth;
