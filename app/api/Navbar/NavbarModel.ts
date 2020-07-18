import mongoose, { Schema, Document } from 'mongoose';

export interface NavbarDocument extends Document {
  logo?: string;
  backgroundColor?: string;
  menuIconColor?: string;
}

const NavbarSchema: Schema = new Schema({
  logo: String,
  backgroundColor: String,
  menuIconColor: String,
});

export default mongoose.model<NavbarDocument>('Navbar', NavbarSchema);
