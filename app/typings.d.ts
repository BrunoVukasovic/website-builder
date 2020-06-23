// import { UserDocument } from './api/User';

import { SiteDocument } from './api/Site';

declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET: string;
    MONGO_URI: string;
  }
}

declare namespace Express {
  interface Request {
    customProperties: string[];
    site: SiteDocument;
  }
}

// declare global {
//   namespace Express {
//     interface user extends UserDocument {}
//   }
// }

// declare namespace Express {
//   export interface Request {
//     userDoc?: UserDocument;
//   }
// }
