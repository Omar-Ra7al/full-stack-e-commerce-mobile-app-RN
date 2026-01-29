import { db, auth } from "./config";
import { createAdminDb } from "@omar-ra7al/firebase-admin-utils/db";
import { createAdminAuth } from "@omar-ra7al/firebase-admin-utils/auth";

import { ADMIN_DB_COLLECTIONS } from "./dbCollections";

export const adminDb = createAdminDb(db, ADMIN_DB_COLLECTIONS);
export const adminAuth = createAdminAuth(auth);
