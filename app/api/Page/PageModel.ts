import mongoose, { Schema, Document, Types } from "mongoose";

import { PageItem } from "../../models";

export interface Page extends Document {
  name: string;
  position: number;
  slug: string;
  container: PageItem[];
  siteID: Types.ObjectId;
}

const PageSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: Number, required: true },
  slug: { type: String, required: true },
  container: [{ position: Number, content: String }],
  siteID: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<Page>("Page", PageSchema);
