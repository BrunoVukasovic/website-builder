import mongoose, { Schema, Document, Types } from 'mongoose';

export interface SiteDocument extends Document {
  title: string;
  slug: string;
  navbarID: Types.ObjectId;
  userID: Types.ObjectId;
}

const SiteSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  navbarID: { type: Schema.Types.ObjectId, required: true },
  userID: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<SiteDocument>('Site', SiteSchema);
