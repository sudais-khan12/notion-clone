import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

const SidebarOptions = ({ href, id }: { href: string; id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathName = usePathname();
  const isActive = href.includes(pathName) && pathName !== "/";

  if (loading) {
    // Render a placeholder while loading
    return (
      <div className="border p-2 rounded-md border-gray-400 animate-pulse">
        <p className="truncate">Loading...</p>
      </div>
    );
  }

  if (error) {
    // Handle errors gracefully
    console.error("Error fetching document:", error);
    return (
      <div className="border p-2 rounded-md border-red-400">
        <p className="truncate text-red-600">Error loading</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`active:bg-gray-300 hover:bg-gray-100 border p-2 rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
      }`}
    >
      <p className="truncate">{data.title}</p>
    </Link>
  );
};

export default SidebarOptions;
