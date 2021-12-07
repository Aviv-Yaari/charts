"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 15,
        validate: /^[a-zA-Z0-9_]*$/,
    },
    password: { type: String, required: true },
    fullname: { type: String, required: true, minlength: 4, maxlength: 15 },
});
exports.UserModel = (0, mongoose_1.model)('User', schema);
