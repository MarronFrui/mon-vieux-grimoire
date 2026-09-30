import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// Explicit type argument: forces model() overload 2, so THydratedDocumentType
// defaults to HydratedDocument<IUser> instead of being inferred from the schema.
export default model<IUser>('User', userSchema);
