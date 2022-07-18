CREATE TABLE "Jurado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pnf" TEXT NOT NULL,
    "trayecto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "asesorID" INTEGER NOT NULL,
    "metodologoID" INTEGER,
    "academicoID" INTEGER,
    "adicionalID" INTEGER,
    CONSTRAINT "Jurado_asesorID_fkey" FOREIGN KEY ("asesorID") REFERENCES "Docente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jurado_metodologoID_fkey" FOREIGN KEY ("metodologoID") REFERENCES "Docente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Jurado_academicoID_fkey" FOREIGN KEY ("academicoID") REFERENCES "Docente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Jurado_adicionalID_fkey" FOREIGN KEY ("adicionalID") REFERENCES "Docente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);