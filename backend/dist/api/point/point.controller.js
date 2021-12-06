"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPoint = void 0;
const getRandomPoint = (req, res) => {
    const num = Math.round(Math.random() * 100);
    res.send({ num });
};
exports.getRandomPoint = getRandomPoint;
