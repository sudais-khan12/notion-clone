"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { removeUserFromDocument, leaveRoom } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { Accessibility, PhoneCallIcon } from "lucide-react";

const ManageUsers = () => {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;

      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("User Removed");
      } else {
        toast.error("Failed to remove user");
      }
    });
  };

  const handleLeaveRoom = () => {
    startTransition(async () => {
      if (!user) return;

      const { success } = await leaveRoom(
        room.id,
        user.emailAddresses[0].toString()
      );

      if (success) {
        toast.success("You have left the room");
        router.replace("/");
      } else {
        toast.error("Failed to leave the room");
      }
    });
  };

  if (usersInRoom && usersInRoom.docs.length > 1) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant={"outline"}>
          <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Users With Access</DialogTitle>
            <DialogDescription>
              The List of Users With Access to This Document 📃
            </DialogDescription>
          </DialogHeader>
          <hr className="my-2" />
          <div className="flex flex-col space-y-2">
            {usersInRoom?.docs.map((doc) => (
              <div key={doc.data().userId} className="flex justify-between">
                <p className="font-light">
                  {doc.data().userId === user?.emailAddresses[0].toString()
                    ? `You (${doc.data().userId})`
                    : doc.data().userId}
                </p>
                <div className="flex items-center gap-2">
                  <Button disabled variant={"outline"}>
                    {doc.data().role}
                  </Button>
                  {isOwner &&
                    doc.data().userId !==
                      user?.emailAddresses[0].toString() && (
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDelete(doc.data().userId)}
                        disabled={isPending}
                        size={"sm"}
                      >
                        {isPending ? "KICKING..." : "KICK"}
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>
          {!isOwner && (
            <div className="mt-2">
              <Button
                variant={"destructive"}
                onClick={handleLeaveRoom}
                disabled={isPending}
              >
                <Accessibility className="mr-1" />{" "}
                {isPending ? "LEAVING..." : `Leave Room`}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  return;
};

export default ManageUsers;
