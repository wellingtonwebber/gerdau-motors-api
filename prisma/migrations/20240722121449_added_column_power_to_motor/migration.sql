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
    "status" TEXT NOT NULL
);
INSERT INTO "new_motors" ("code", "current", "frame", "id", "manufacturer", "model", "rpm", "status", "type", "voltage") SELECT "code", "current", "frame", "id", "manufacturer", "model", "rpm", "status", "type", "voltage" FROM "motors";
DROP TABLE "motors";
ALTER TABLE "new_motors" RENAME TO "motors";
CREATE UNIQUE INDEX "motors_code_key" ON "motors"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
