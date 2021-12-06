"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchSync_middleware_1 = require("../../middlewares/catchSync.middleware");
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const point_controller_1 = require("./point.controller");
const router = express_1.default.Router();
router.get('/', requireAuth_middleware_1.requireAuth, (0, catchSync_middleware_1.catchSync)(point_controller_1.getRandomPoint));
exports.default = router;
