/*
  Warnings:

  - A unique constraint covering the columns `[Category_name_AR]` on the table `blog_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Category_name_EN]` on the table `blog_category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "blog_category_Category_name_AR_key" ON "blog_category"("Category_name_AR");

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_Category_name_EN_key" ON "blog_category"("Category_name_EN");
