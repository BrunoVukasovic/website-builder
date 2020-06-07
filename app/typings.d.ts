// import { UserDocument } from './api/User';

declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET: string;
    MONGO_URI: string;
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
