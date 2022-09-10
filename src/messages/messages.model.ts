import { Schema, model } from "mongoose";
import { UserCollectionName } from "../users/users.model";

export const MessagesCollectionName = "message";

enum messagesTypes {
  fromUser = "fromUser",
  fromSystem = "fromSystem",
}

const MessagesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserCollectionName,
    required: true,
  },
  type: {
    type: String,
    enum: messagesTypes,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const MessagesModel = model(MessagesCollectionName, MessagesSchema);
