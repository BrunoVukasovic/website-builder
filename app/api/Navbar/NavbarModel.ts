import mongoose, { Schema, Document } from "mongoose";

export interface Navbar extends Document {
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
}

const NavbarSchema: Schema = new Schema({
  logo: String,
  backgroundColor: String,
  textColor: String,
});

export default mongoose.model<Navbar>("Navbar", NavbarSchema);
