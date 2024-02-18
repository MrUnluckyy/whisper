"use client";
import useConversation from "@/app/hooks/useConversation";
import { Message } from "@prisma/client";
import React, { FC, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import { useSession } from "next-auth/react";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: FC<BodyProps> = ({ initialMessages }) => {
  const session = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          data={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
