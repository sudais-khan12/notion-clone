"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDoc from "./DeleteDoc";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

const Document = ({ id }: { id: string }) => {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);
  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), { title: input });
      });
    }
  };
  return (
    <div className="flex-1 bg-white p-5 h-full rounded-2xl">
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
          {isOwner && (
            <>
              {/* invite User  */}
              <InviteUser />
              {/* Delete Document  */}
              <DeleteDoc />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        {/* manage users */}
        <ManageUsers />
        {/* avatars */}
        <Avatars />
      </div>
      <hr className="pb-10" />
      {/* colabrative editer */}
      <Editor />
    </div>
  );
};
export default Document;
