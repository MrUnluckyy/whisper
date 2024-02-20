import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
  parent?: (Message & Sender) | null;
};

export type Sender = {
  sender: User;
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
  | "valentine"
  | "cyberpunk";

export type TenorGifs = {
  content: string;
  created: number;
  flags: any[];
  hasAudio: boolean;
  id: string;
  itemurl: string;
  media_formats: TenorGifFormats;
  tags: string[];
  title: string;
  url: string;
};

export type TenorGifFormats = {
  gif: TenorGifFormat;
  gifPreview: TenorGifFormat;
  tinygif: TenorGifFormat;
};

export type TenorGifFormat = {
  dims: number[];
  duration: number;
  preview: string;
  size: number;
  url: string;
};
