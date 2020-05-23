import mongoose, { Schema, Document } from "mongoose";

import { Page } from "../Page/PageModel";

export interface NavbarItem {
  name: string;
  position: number;
  pageID: Page["_id"];
}

export interface Navbar extends Document {
  navbarItems: NavbarItem[]; //@TODO izbaci i stavi u Pages
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
}

// const NavbarItemSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   position: { type: Number, required: true },
//   page: { type: Schema.Types.ObjectId, required: true },
// });

const NavbarSchema: Schema = new Schema({
  navbarItems: [
    { name: String, position: Number, pageID: Schema.Types.ObjectId },
  ],
  logo: String,
  backgroundColor: String,
  textColor: String,
});

export default mongoose.model<Navbar>("Navbar", NavbarSchema);
