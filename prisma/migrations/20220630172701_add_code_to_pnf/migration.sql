/*
  Warnings:

  - Added the required column `codigo` to the `PNF` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PNF" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL
);
INSERT INTO "new_PNF" ("id", "nombre") SELECT "id", "nombre" FROM "PNF";
DROP TABLE "PNF";
ALTER TABLE "new_PNF" RENAME TO "PNF";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
