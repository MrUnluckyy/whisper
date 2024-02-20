import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
  parent?: Message | null;
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export type ThemeType =
  | "lofi"
  | "dim"
  | "night"
  | "coffee"
  | "cmyk"
  | "cyberpunk";
