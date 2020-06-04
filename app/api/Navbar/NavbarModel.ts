import mongoose, { Schema, Document } from 'mongoose';

export interface NavbarModel extends Document {
  logo?: string;
  backgroundColor?: string;
}

const NavbarSchema: Schema = new Schema({
  logo: String,
  backgroundColor: String,
});

export default mongoose.model<NavbarModel>('Navbar', NavbarSchema);
