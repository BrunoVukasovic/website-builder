import mongoose, { Schema, Document, Types } from "mongoose";

import { PageItem } from "../../models";

export interface Page extends Document {
  name: string;
  position: number;
  container: PageItem[];
  siteID: Types.ObjectId;
}

const PageSchema: Schema = new Schema({
  name: String,
  position: Number,
  container: [{ position: Number, content: String }],
  siteID: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<Page>("Page", PageSchema);
