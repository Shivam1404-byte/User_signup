/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Organisation_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_id_name_key" ON "Organisation"("id", "name");
