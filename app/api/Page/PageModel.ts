import mongoose, { Schema, Document, Types } from 'mongoose';

import { PageSegment } from '../../models';

export interface PageDocument extends Document {
  name: string;
  position: number;
  slug: string;
  //@TODO sortiraj PageSegmente-e po positionu
  container: PageSegment[];
  siteID: Types.ObjectId;
}

const PageSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: Number, required: true },
  slug: { type: String, required: true },
  container: [{ position: Number, content: String }],
  siteID: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<PageDocument>('Page', PageSchema);
