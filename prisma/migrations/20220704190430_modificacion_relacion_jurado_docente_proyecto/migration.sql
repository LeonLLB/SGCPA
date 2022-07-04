/*
  Warnings:

  - You are about to drop the column `pnf` on the `Defensa` table. All the data in the column will be lost.
  - You are about to drop the column `trayecto` on the `Defensa` table. All the data in the column will be lost.
  - You are about to drop the column `cargaID` on the `Proyecto` table. All the data in the column will be lost.
  - You are about to drop the column `pnf` on the `Proyecto` table. All the data in the column will be lost.
  - You are about to drop the column `trayecto` on the `Proyecto` table. All the data in the column will be lost.
  - Added the required column `juradoID` to the `Proyecto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Defensa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "periodo" TEXT NOT NULL,
    "preDefensa" DATETIME NOT NULL,
    "defensa" DATETIME NOT NULL,
    "aula" TEXT NOT NULL,
    "juradoID" INTEGER NOT NULL,
    CONSTRAINT "Defensa_juradoID_fkey" FOREIGN KEY ("juradoID") REFERENCES "Jurado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Defensa" ("aula", "defensa", "id", "juradoID", "periodo", "preDefensa") SELECT "aula", "defensa", "id", "juradoID", "periodo", "preDefensa" FROM "Defensa";
DROP TABLE "Defensa";
ALTER TABLE "new_Defensa" RENAME TO "Defensa";
CREATE TABLE "new_Proyecto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "periodo" TEXT NOT NULL,
    "juradoID" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "comunidad" TEXT NOT NULL,
    "linea" TEXT NOT NULL,
    "temaGenerador" TEXT NOT NULL,
    "cdEntregado" BOOLEAN NOT NULL,
    CONSTRAINT "Proyecto_juradoID_fkey" FOREIGN KEY ("juradoID") REFERENCES "Jurado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Proyecto" ("cdEntregado", "comunidad", "id", "linea", "periodo", "temaGenerador", "titulo") SELECT "cdEntregado", "comunidad", "id", "linea", "periodo", "temaGenerador", "titulo" FROM "Proyecto";
DROP TABLE "Proyecto";
ALTER TABLE "new_Proyecto" RENAME TO "Proyecto";
CREATE UNIQUE INDEX "Proyecto_titulo_key" ON "Proyecto"("titulo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
