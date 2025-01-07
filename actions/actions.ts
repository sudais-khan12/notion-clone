"use server";

import { admindb } from "@/firebase-admin";
import liveblocks from "@/lib/liveBlocks";
import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";

export async function createDocument() {
  auth.protect();

  const { sessionClaims } = await auth();
  const email = sessionClaims?.email;

  if (!email) {
    throw new Error("User email is not available in session claims.");
  }

  const docCollectionRef = admindb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Document",
  });

  await admindb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: email,
      roomId: docRef.id,
      role: "owner",
      createdAt: Date.now(),
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth.protect();

  try {
    await admindb.collection("documents").doc(roomId).delete();
    const query = await admindb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = admindb.batch();
    query.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  auth.protect();

  const { sessionClaims } = await auth();
  const userEmail = sessionClaims?.email;

  if (email === userEmail) return { success: false };

  try {
    await admindb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        roomId,
        role: "editor",
        createdAt: new Date(),
      });

    return { success: true };
  } catch (error) {
    console.error("Error Sending Invite:", error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();

  try {
    await admindb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error("Error Removing User From Roommmm:", error);
    return { success: false };
  }
}

export async function leaveRoom(roomId: string, email: string) {
  try {
    await admindb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();
    return { success: true };
  } catch (error) {
    console.error("Error Leaving Room:", error);
    return { success: false };
  }
}

export async function sendEmail(subject: string, content: string) {
  auth.protect();

  const { sessionClaims } = await auth();
  const email = sessionClaims?.email;

  if (!email) {
    // throw new Error("User email is not available in session claims.");
    return { success: false };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const response = await resend.emails.send({
      from: email,
      to: "sudaiskh31@gmail.com", // Replace with actual recipient email
      subject,
      html: content,
    });

    console.log("Email sent successfully:", response);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);

    // Handle specific errors (e.g., network errors, authentication errors)
    // and provide more informative error messages to the user

    return { success: false };
  }
}