import mongoose, {
  Schema,
  model,
  CallbackWithoutResultAndOptionalError,
} from "mongoose";
import { hash, compare } from "bcrypt";

export const UserCollectionName = "user";

export interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  phone: number;
  email: string;
  password: string;
  admin: boolean;
  isValidPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    this.password = await hash(this.password, 10);
    next();
  }
);

UserSchema.methods.isValidPassword = async function (password: string) {
  const cpre = await compare(password, this.password);
  return cpre;
};

export const UserModel = model<UserDoc>(UserCollectionName, UserSchema);
