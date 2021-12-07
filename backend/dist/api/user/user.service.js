"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = require("mongoose");
const error_service_1 = require("../../services/error.service");
const user_model_1 = require("./user.model");
const add = async (userDetails) => {
    try {
        const user = new user_model_1.UserModel(userDetails);
        await user.save();
    }
    catch (err) {
        if (err instanceof mongoose_1.Error.ValidationError)
            throw new error_service_1.ExpressError(err.message, 400);
        throw err;
    }
};
const query = async (filter) => {
    const user = await user_model_1.UserModel.findOne(filter);
    return user;
};
exports.userService = { add, query };
