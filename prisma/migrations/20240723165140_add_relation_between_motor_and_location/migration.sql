-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_motors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "manufacturer" TEXT,
    "power" REAL NOT NULL DEFAULT 0,
    "voltage" INTEGER NOT NULL,
    "current" REAL NOT NULL,
    "rpm" INTEGER NOT NULL,
    "frame" TEXT,
    "type" TEXT,
    "model" TEXT,
    "status_id" INTEGER NOT NULL DEFAULT 0,
    "location_id" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "motors_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "motors_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_motors" ("code", "current", "frame", "id", "manufacturer", "model", "power", "rpm", "status_id", "type", "voltage") SELECT "code", "current", "frame", "id", "manufacturer", "model", "power", "rpm", "status_id", "type", "voltage" FROM "motors";
DROP TABLE "motors";
ALTER TABLE "new_motors" RENAME TO "motors";
CREATE UNIQUE INDEX "motors_code_key" ON "motors"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
