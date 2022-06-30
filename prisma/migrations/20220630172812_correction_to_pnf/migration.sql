/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `PNF` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo]` on the table `PNF` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PNF_nombre_key" ON "PNF"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "PNF_codigo_key" ON "PNF"("codigo");
