"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

const InviteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    const roomId = pathname.split("/").pop();
    if (!roomId) return;

    startTransition(async () => {
      const { success } = await inviteUserToDocument(roomId, email);

      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("Invite Sent");
      } else {
        toast.error("Failed to send invite");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>Enter the Guest Email 📧</DialogDescription>
        </DialogHeader>
        <form className="flex gap-2" onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="Guest Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant={"outline"}
            onClick={handleInvite}
            disabled={!email || isPending}
          >
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default InviteUser;
