/*
  Warnings:

  - You are about to drop the column `juradoID` on the `Defensa` table. All the data in the column will be lost.
  - Added the required column `pnf` to the `Defensa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trayecto` to the `Defensa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Defensa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pnf" TEXT NOT NULL,
    "trayecto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "preDefensa" DATETIME,
    "defensa" DATETIME,
    "aula" TEXT
);
INSERT INTO "new_Defensa" ("aula", "defensa", "id", "periodo", "preDefensa") SELECT "aula", "defensa", "id", "periodo", "preDefensa" FROM "Defensa";
DROP TABLE "Defensa";
ALTER TABLE "new_Defensa" RENAME TO "Defensa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
