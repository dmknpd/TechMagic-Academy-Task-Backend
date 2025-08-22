import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "seller";
  refreshTokens: string[];
  comparePassword(comparePassword: string): Promise<boolean>;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "seller"], default: "seller" },
  refreshTokens: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function (
  comparePassword: string
): Promise<boolean> {
  return bcrypt.compare(comparePassword, this.password);
};

export default model("User", UserSchema);
