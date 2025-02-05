"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, SendHorizonalIcon } from "lucide-react";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import { useState, useTransition } from "react";
import { sendEmail } from "@/actions/actions";
import { toast } from "sonner";

const ContactForm = () => {
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const isFormValid = subject.trim() !== "" && content.trim() !== "";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const { success } = await sendEmail(subject, content);

      if (success) {
        setContent("");
        setSubject("");
        toast.success("Email Sent!");
      } else {
        toast.error("Failed to Send Email!");
      }
    });
  };
  return (
    <div>
      <div className="flex justify-end w-full mb-5">
        <Link href={"/about"}>
          <Button className="text-sm">
            <ArrowLeftIcon /> Back
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-5">Contact Us</h1>
        <form
          className="flex flex-col gap-4 w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="subject"
              className="block text-lg font-semibold mb-2"
            >
              Subject
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter subject"
              className="w-full shadow-md p-2 rounded-md"
              value={subject}
              onChange={handleSubjectChange}
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-semibold mb-2"
            >
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Enter content"
              className="w-full shadow-md p-2 rounded-md resize-none h-24"
              rows={12}
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <div className="text-right">
            <Button
              type="submit"
              className="mt-4 text-sm"
              disabled={isPending || !isFormValid}
            >
              <SendHorizonalIcon /> {isPending ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
