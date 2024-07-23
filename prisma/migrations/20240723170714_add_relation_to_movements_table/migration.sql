/*
  Warnings:

  - Added the required column `motor_id` to the `movements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `movements` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "motor_id" TEXT NOT NULL,
    CONSTRAINT "movements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "movements_motor_id_fkey" FOREIGN KEY ("motor_id") REFERENCES "motors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_movements" ("created_at", "id") SELECT "created_at", "id" FROM "movements";
DROP TABLE "movements";
ALTER TABLE "new_movements" RENAME TO "movements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
