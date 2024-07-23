/*
  Warnings:

  - Added the required column `sector_id` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_locations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "sector_id" INTEGER NOT NULL,
    CONSTRAINT "locations_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_locations" ("code", "id") SELECT "code", "id" FROM "locations";
DROP TABLE "locations";
ALTER TABLE "new_locations" RENAME TO "locations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
