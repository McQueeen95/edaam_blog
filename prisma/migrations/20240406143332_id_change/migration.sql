/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `Article_id` on the `Blog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
DROP COLUMN "Article_id",
ADD COLUMN     "Article_id" UUID NOT NULL,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("Article_id");
