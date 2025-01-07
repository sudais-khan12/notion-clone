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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import React, { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";
import { MdOutlineSummarize } from "react-icons/md";
import { Language } from "@/types/types";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "urdu",
  "hindi",
  "pashto",
  "russian",
  "japanese",
  "punjabi",
  "saraiki",
];
const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState<string>("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      console.log("Document Data Sent:", documentData); // Debugging line

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ documentData, targetLanguage: language }),
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server Error:", errorText);
          toast.error("Failed to translate document");
          return;
        }

        const { translated_text } = await res.json();
        console.log("Translated Text:", translated_text);

        setSummary(translated_text);
        toast.success("Translated Successfully");
      } catch (error) {
        console.error("Unexpected Error:", error);
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>
          {" "}
          <LanguagesIcon /> Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate and Summarize the Document</DialogTitle>
          <DialogDescription>
            Selece a language and AI will translate and summarize the document
            in the target language
          </DialogDescription>
          <hr className="mt-5" />
          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>
        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking" : "says : "}
              </p>
            </div>
            <p>
              {isPending ? "Translating..." : <Markdown>{summary}</Markdown>}
            </p>
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            variant={"outline"}
            onClick={handleAskQuestion}
            disabled={!language || isPending}
          >
            <MdOutlineSummarize />
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TranslateDocument;
