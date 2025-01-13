"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const Breadcrumbs = () => {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean); // Remove empty segments
  const id = segments[segments.length - 1]; // Get the last segment

  // Validate `id` before fetching the document
  const docRef = id ? doc(db, "documents", id) : null;
  const [data, loading, error] = useDocumentData(
    docRef as ReturnType<typeof doc>
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              Home <HomeIcon />{" "}
            </div>
          </Link>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="cursor-pointer truncate">
                    {loading
                      ? "Loading..."
                      : error
                      ? "Error"
                      : data?.title || "Untitled"}
                  </BreadcrumbPage>
                ) : (
                  <Link href={href} className="cursor-pointer">{segment}</Link>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
