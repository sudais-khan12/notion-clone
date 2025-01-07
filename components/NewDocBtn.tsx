"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createDocument } from "@/actions/actions";
import { DockIcon } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const NewDocBtn = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = async () => {
    try {
      startTransition(async () => {
        const { docId } = await createDocument();
        router.push(`/doc/${docId}`);
      });
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <SignedOut>Sign in Please</SignedOut>

      <SignedIn>
        <Button
          className="p-2 w-full"
          onClick={handleCreateNewDocument}
          disabled={isPending}
          size={"lg"}
        >
          <DockIcon className="mr-1" />
          {isPending ? "Loading..." : `New Doc`}
        </Button>
      </SignedIn>
    </div>
  );
};

export default NewDocBtn;
