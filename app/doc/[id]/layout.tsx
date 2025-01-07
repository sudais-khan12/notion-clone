import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";

const DocLayout = ({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(paramsPromise);

  auth.protect();

  if (!id) return;

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};

export default DocLayout;
