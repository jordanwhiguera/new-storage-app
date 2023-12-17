"use client";
import Container from "@/app/components/Container";
import MessageInput from "@/app/components/inputs/MessageInput";
import MessageBubble from "@/app/components/message/MessageBubble";
import MessageHead from "@/app/components/message/MessageHead";
import React from "react";

const MessageClient = () => {
  return (
    <Container>
      <div className="mt-20"></div>
      <MessageHead />
      <MessageBubble />
      <MessageBubble gray />
      <MessageInput />
    </Container>
  );
};

export default MessageClient;
