import { db, auth } from "./config";
import { createClientDb } from "@omar-ra7al/firebase-client-utils/db";
import { createClientAuth } from "@omar-ra7al/firebase-client-utils/auth";
// import { createClientStorage } from "../../src/client/storage";

import { CLIENT_DB_COLLECTIONS } from "./dbCollections";

export const clientDb = createClientDb(db, CLIENT_DB_COLLECTIONS);
export const clientAuth = createClientAuth(auth);
// export const clientStorage = createClientStorage(storage);
