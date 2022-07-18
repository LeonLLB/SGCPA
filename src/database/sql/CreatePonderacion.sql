CREATE TABLE "Ponderacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proyectoID" INTEGER NOT NULL,
    "definicion" TEXT NOT NULL, --- JSON STRING
    CONSTRAINT "Ponderacion_proyectoID_fkey" FOREIGN KEY ("proyectoID") REFERENCES "Proyecto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "Ponderacion_proyectoID_key" ON "Ponderacion"("proyectoID");