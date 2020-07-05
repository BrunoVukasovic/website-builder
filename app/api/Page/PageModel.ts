import mongoose, { Schema, Document, Types } from 'mongoose';

import { PageSegment } from '../../models';

export interface PageDocument extends Document {
  name: string;
  position: number;
  slug: string;
  backgroundColor: string;
  container: PageSegment[];
  siteID: Types.ObjectId;
}

const PageSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: Number, required: true },
  slug: { type: String, required: true },
  backgroundColor: { type: String },
  container: [
    {
      position: Number,
      content: String,
      type: { type: String },
      style: { wrapper: { position: String }, content: { width: String, height: String } },
    },
  ],
  siteID: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<PageDocument>('Page', PageSchema);
