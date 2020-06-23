import { SiteDocument } from '../../api/Site';

declare namespace Express {
  interface Request {
    customProperties: string[];
    // site: SiteDocument;
  }
}
