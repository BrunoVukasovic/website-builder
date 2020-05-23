import mongoose, { Schema, Document } from "mongoose";

import { Navbar } from "../Navbar";
import { PageItem } from "../../models";

export interface Page extends Document {
  container: [PageItem];
  navbarID: Navbar["_id"];
}

const PageSchema: Schema = new Schema({
  container: [{ position: Number, content: String }],
  navbarID: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<Page>("Page", PageSchema);
