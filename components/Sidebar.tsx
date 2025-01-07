"use client";
import { BookOpenText, MenuIcon } from "lucide-react";
import NewDocBtn from "./NewDocBtn";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOptions from "./SidebarOptions";
import Link from "next/link";
import { Button } from "./ui/button";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }

        return acc;
      },
      {
        owner: [], // Ensure this matches the key in `groupedData`
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);
  const menuOptions = (
    <>
      <NewDocBtn />
      <div className="flex flex-col space-y-4 md:max-w-36">
        {/* my docs */}
        {groupedData.owner.length === 0 ? (
          <h2 className="text-sm font-semibold text-gray-500 mt-5">
            No docs found
          </h2>
        ) : (
          <>
            <h2 className="text-sm font-semibold text-gray-500 mt-4">
              MY DOCS
            </h2>
            {groupedData.owner.map((doc) => (
              <SidebarOptions
                key={doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
          </>
        )}

        {/* share */}
        {groupedData.editor.length === 0 ? (
          <h2 className="text-sm font-semibold text-gray-500">No docs found</h2>
        ) : (
          <>
            <h2 className="text-sm font-semibold text-gray-500 mt-4">
              Shared With Me
            </h2>
            {groupedData.editor.map((doc) => (
              <SidebarOptions
                key={doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
          </>
        )}
      </div>
      <div className="fixed bottom-10">
        <Link href="/about">
          {" "}
          <Button className="p-2 w-full">
            {" "}
            <BookOpenText /> About{" "}
          </Button>{" "}
        </Link>
      </div>
    </>
  );

  return (
    <div className="group h-screen sticky top-0 bg-gray-200">
      {/* Scrollable sidebar content */}
      <div className="custom-scrollbar overflow-y-auto h-full p-4 md:p-5 space-y-4">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon
                className="p-2 md:p-5 hover:opacity-30 rounded-lg"
                size={40}
              />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <div className="max-h-screen overflow-y-auto">
                  {menuOptions}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop view content */}
        <div className="hidden md:inline max-h-screen overflow-y-auto">
          {menuOptions}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
