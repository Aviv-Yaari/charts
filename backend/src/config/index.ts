import { dbDev } from './dev';
import { dbProd } from './prod';

// export const dbUrl = process.env.NODE_ENV === 'production' ? dbProd : dbDev;
export const dbUrl = dbProd;
