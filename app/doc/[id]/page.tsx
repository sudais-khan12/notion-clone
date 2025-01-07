"use client";

import Document from "@/components/Document";
import { use } from "react";

const DocumentPage = ({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(paramsPromise);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
};
export default DocumentPage;
