-- CreateTable
CREATE TABLE "Docente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "pnf" TEXT NOT NULL,
    "trayecto" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PNF" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CargaAcademica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pnf" TEXT NOT NULL,
    "trayecto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "docenteID" INTEGER NOT NULL,
    "turno" TEXT NOT NULL,
    "horario1" TEXT NOT NULL,
    "horario2" TEXT,
    "aula" INTEGER NOT NULL,
    CONSTRAINT "CargaAcademica_docenteID_fkey" FOREIGN KEY ("docenteID") REFERENCES "Docente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
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

-- CreateTable
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

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pnf" TEXT NOT NULL,
    "trayecto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "cargaID" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "comunidad" TEXT NOT NULL,
    "linea" TEXT NOT NULL,
    "temaGenerador" TEXT NOT NULL,
    "cdEntregado" BOOLEAN NOT NULL,
    CONSTRAINT "Proyecto_cargaID_fkey" FOREIGN KEY ("cargaID") REFERENCES "CargaAcademica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fotos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proyectoID" INTEGER NOT NULL,
    CONSTRAINT "Fotos_proyectoID_fkey" FOREIGN KEY ("proyectoID") REFERENCES "Proyecto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ponderacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proyectoID" INTEGER NOT NULL,
    "definicion" TEXT NOT NULL,
    CONSTRAINT "Ponderacion_proyectoID_fkey" FOREIGN KEY ("proyectoID") REFERENCES "Proyecto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Docente_cedula_key" ON "Docente"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_cedula_key" ON "Estudiante"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Proyecto_titulo_key" ON "Proyecto"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Ponderacion_proyectoID_key" ON "Ponderacion"("proyectoID");
