CREATE TABLE "Estudiante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "correo" TEXT,
    "telefono" TEXT,
    "direccion" TEXT NOT NULL,
    "pnf" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "trayecto" INTEGER NOT NULL
);
CREATE UNIQUE INDEX "Estudiante_cedula_key" ON "Estudiante"("cedula");