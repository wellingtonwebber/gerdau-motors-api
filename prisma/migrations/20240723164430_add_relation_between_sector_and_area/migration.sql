/*
  Warnings:

  - Added the required column `area_id` to the `sectors` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sectors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "area_id" INTEGER NOT NULL,
    CONSTRAINT "sectors_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sectors" ("id", "name") SELECT "id", "name" FROM "sectors";
DROP TABLE "sectors";
ALTER TABLE "new_sectors" RENAME TO "sectors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
