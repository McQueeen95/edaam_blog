-- AlterTable
ALTER TABLE "blog" ALTER COLUMN "Article_id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "blog_category" ALTER COLUMN "Id_blog_cat" SET DEFAULT gen_random_uuid();
