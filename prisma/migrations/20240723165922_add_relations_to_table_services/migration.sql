/*
  Warnings:

  - Added the required column `motor_id` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partner_id` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_status_id` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_tag" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motor_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "service_status_id" INTEGER NOT NULL,
    CONSTRAINT "services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "services_motor_id_fkey" FOREIGN KEY ("motor_id") REFERENCES "motors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "services_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "services_service_status_id_fkey" FOREIGN KEY ("service_status_id") REFERENCES "service-status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_services" ("created_at", "id", "price", "service_tag") SELECT "created_at", "id", "price", "service_tag" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
