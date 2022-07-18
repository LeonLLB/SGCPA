CREATE TABLE "Proyecto" (
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
CREATE UNIQUE INDEX "Proyecto_titulo_key" ON "Proyecto"("titulo");