-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Docente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Docente" ("apellido", "cedula", "correo", "direccion", "id", "nombre", "telefono") SELECT "apellido", "cedula", "correo", "direccion", "id", "nombre", "telefono" FROM "Docente";
DROP TABLE "Docente";
ALTER TABLE "new_Docente" RENAME TO "Docente";
CREATE UNIQUE INDEX "Docente_cedula_key" ON "Docente"("cedula");
CREATE TABLE "new_Estudiante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "pnf" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "trayecto" INTEGER NOT NULL
);
INSERT INTO "new_Estudiante" ("apellido", "cedula", "correo", "direccion", "id", "nombre", "pnf", "telefono", "trayecto") SELECT "apellido", "cedula", "correo", "direccion", "id", "nombre", "pnf", "telefono", "trayecto" FROM "Estudiante";
DROP TABLE "Estudiante";
ALTER TABLE "new_Estudiante" RENAME TO "Estudiante";
CREATE UNIQUE INDEX "Estudiante_cedula_key" ON "Estudiante"("cedula");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
