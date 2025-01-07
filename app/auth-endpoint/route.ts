import { admindb } from "@/firebase-admin";
import liveblocks from "@/lib/liveBlocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();

  // Add null checks before accessing properties
  if (!sessionClaims?.email) {
    return NextResponse.json({ message: "No email found" }, { status: 401 });
  }

  const { room } = await req.json();

  const session = liveblocks.prepareSession(sessionClaims.email, {
    userInfo: {
      name: sessionClaims.fullName || "Anonymous",
      avatar: sessionClaims.image || "/default-avatar.png",
      email: sessionClaims.email,
    },
  });

  const usersInRoom = await admindb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
}
