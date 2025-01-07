"use client";
import * as Y from "yjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import React, { FormEvent, useState, useTransition } from "react";
import { BotMessageSquareIcon, MessageCircleQuestionIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import Markdown from "react-markdown";

const ChatWithDoc = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [input, setInput] = useState("");

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    setQuestion(input);

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: input, documentData }),
          }
        );
        const data = await res.json();
        setAnswer(data.response);
        setInput("");
      } catch (error) {
        console.error("Failed to ask question", error);
        toast.error("Failed to ask question");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>
          {" "}
          <MessageCircleQuestionIcon /> Chat
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat with the Document</DialogTitle>
          <DialogDescription>
            Ask the Question you have in mind about the document, AI will help
            you with your Queries.
          </DialogDescription>
          <hr className="mt-5" />
          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>
        {answer && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotMessageSquareIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking" : "says : "}
              </p>
            </div>
            <p>{isPending ? "Thinking...." : <Markdown>{answer}</Markdown>}</p>
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            type="text"
            placeholder="EX. What is the document about?"
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            type="submit"
            variant={"outline"}
            onClick={handleAskQuestion}
            disabled={!input || isPending}
          >
            <MessageCircleQuestionIcon /> {isPending ? "Asking..." : "ASK"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ChatWithDoc;
