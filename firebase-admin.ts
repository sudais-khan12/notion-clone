import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceKey from "@/service_key.json"; // Ensure this path is correct

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: serviceKey.project_id,
      privateKey: serviceKey.private_key.replace(/\\n/g, "\n"), // Fix escaped newlines
      clientEmail: serviceKey.client_email,
    }),
  });
} else {
  app = getApp();
}

const admindb = getFirestore(app);

export { app as adminApp, admindb };
