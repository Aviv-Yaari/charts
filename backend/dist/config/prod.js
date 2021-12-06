"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProd = void 0;
exports.dbProd = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxpry.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
