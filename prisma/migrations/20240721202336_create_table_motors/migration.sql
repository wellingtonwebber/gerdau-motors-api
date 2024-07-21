-- CreateTable
CREATE TABLE "motors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "manufacturer" TEXT,
    "voltage" INTEGER NOT NULL,
    "current" REAL NOT NULL,
    "rpm" INTEGER NOT NULL,
    "frame" TEXT,
    "type" TEXT,
    "model" TEXT,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "motors_code_key" ON "motors"("code");
