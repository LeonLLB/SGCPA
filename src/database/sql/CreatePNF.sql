CREATE TABLE "PNF" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL
);
CREATE UNIQUE INDEX "PNF_nombre_key" ON "PNF"("nombre");
CREATE UNIQUE INDEX "PNF_codigo_key" ON "PNF"("codigo");
