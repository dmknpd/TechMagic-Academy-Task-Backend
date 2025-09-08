import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
  refreshTokens: string[];
  comparePassword(comparePassword: string): Promise<boolean>;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 100,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 60,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
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
