"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUrl = void 0;
const prod_1 = require("./prod");
// export const dbUrl = process.env.NODE_ENV === 'production' ? dbProd : dbDev;
exports.dbUrl = prod_1.dbProd;
