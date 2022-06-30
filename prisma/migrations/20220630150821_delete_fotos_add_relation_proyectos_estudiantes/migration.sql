/*
  Warnings:

  - You are about to drop the `Fotos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Fotos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_EstudianteToProyecto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EstudianteToProyecto_A_fkey" FOREIGN KEY ("A") REFERENCES "Estudiante" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EstudianteToProyecto_B_fkey" FOREIGN KEY ("B") REFERENCES "Proyecto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EstudianteToProyecto_AB_unique" ON "_EstudianteToProyecto"("A", "B");

-- CreateIndex
CREATE INDEX "_EstudianteToProyecto_B_index" ON "_EstudianteToProyecto"("B");
