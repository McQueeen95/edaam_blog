/*
  Warnings:

  - A unique constraint covering the columns `[Article_title_AR]` on the table `blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Article_title_EN]` on the table `blog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "blog_Article_title_AR_key" ON "blog"("Article_title_AR");

-- CreateIndex
CREATE UNIQUE INDEX "blog_Article_title_EN_key" ON "blog"("Article_title_EN");
