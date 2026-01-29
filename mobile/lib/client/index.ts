import { db, auth, storage } from "./config";
import { createClientDb } from "../../src/client/firestore";
import { createClientAuth } from "../../src/client/auth";
import { createClientStorage } from "../../src/client/storage";

import { CLIENT_DB_COLLECTIONS } from "./dbCollections";

export const clientDb = createClientDb(db, CLIENT_DB_COLLECTIONS);
export const clientAuth = createClientAuth(auth);
export const clientStorage = createClientStorage(storage);
