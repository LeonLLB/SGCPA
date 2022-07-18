CREATE TABLE "Defensa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pnf" TEXT NOT NULL,
    "trayecto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "preDefensa" DATETIME NOT NULL,
    "defensa" DATETIME NOT NULL,
    "aula" TEXT NOT NULL,
    "juradoID" INTEGER NOT NULL,
    CONSTRAINT "Defensa_juradoID_fkey" FOREIGN KEY ("juradoID") REFERENCES "Jurado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);