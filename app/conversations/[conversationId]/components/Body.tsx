"use client";
import useConversation from "@/app/hooks/useConversation";
import React, { FC, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import useNotificationList from "@/app/hooks/useNotificationList";
import { useSession } from "next-auth/react";
import Form from "./Form";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: FC<BodyProps> = ({ initialMessages }) => {
  const session = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const [replyTo, setReplyTo] = useState<FullMessageType | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { remove, set, notifications } = useNotificationList();
  const { conversationId } = useConversation();

  console.log(messages);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`).then(() => {
        const hasSeen = (seenArray: FullMessageType["seen"]) => {
          return !!seenArray.find(
            (usr) => usr.email === session.data?.user?.email
          );
        };

        messages.filter((msg) => {
          if (hasSeen(msg.seen)) {
            remove(msg.id);
          }
        });
      });

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
      remove(message.id);

      bottomRef.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
      remove(newMessage.id);
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId, messages, remove]);

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-base-100">
        {messages.map((message, i) => (
          <MessageBox
            key={message.id}
            data={message}
            isLast={i === messages.length - 1}
            onReply={(message) => setReplyTo(message)}
          />
        ))}
        <div ref={bottomRef} className="pt-24" />
      </div>
      <Form repliedTo={replyTo} onReplyReset={() => setReplyTo(null)} />
    </>
  );
};

export default Body;
