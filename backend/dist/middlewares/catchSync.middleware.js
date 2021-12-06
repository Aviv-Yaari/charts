"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchSync = void 0;
const catchSync = (func) => {
    return (req, res, next) => {
        try {
            func(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
};
exports.catchSync = catchSync;
