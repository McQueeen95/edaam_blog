/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_Category_id_fkey";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "Blog_category";

-- CreateTable
CREATE TABLE "blog" (
    "Article_id" UUID NOT NULL,
    "Article_title_AR" VARCHAR(255) NOT NULL,
    "Article_title_EN" VARCHAR(255),
    "Post_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://img.ev.mu/images/portfolio/pays/181/1605x1070/847131.jpg',
    "Article_content" TEXT NOT NULL,
    "Category_id" UUID NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("Article_id")
);

-- CreateTable
CREATE TABLE "blog_category" (
    "Id_blog_cat" UUID NOT NULL,
    "Category_name_AR" VARCHAR(255) NOT NULL,
    "Category_name_EN" VARCHAR(255),

    CONSTRAINT "blog_category_pkey" PRIMARY KEY ("Id_blog_cat")
);

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_Category_id_fkey" FOREIGN KEY ("Category_id") REFERENCES "blog_category"("Id_blog_cat") ON DELETE RESTRICT ON UPDATE CASCADE;
