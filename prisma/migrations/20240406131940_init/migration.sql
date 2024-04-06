-- CreateTable
CREATE TABLE "Blog" (
    "Article_id" TEXT NOT NULL,
    "Article_title_AR" VARCHAR(255) NOT NULL,
    "Article_title_EN" VARCHAR(255),
    "Post_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://img.ev.mu/images/portfolio/pays/181/1605x1070/847131.jpg',
    "Article_content" TEXT NOT NULL,
    "Category_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("Article_id")
);

-- CreateTable
CREATE TABLE "Blog_category" (
    "Id_blog_cat" TEXT NOT NULL,
    "Category_name_AR" VARCHAR(255) NOT NULL,
    "Category_name_EN" VARCHAR(255),

    CONSTRAINT "Blog_category_pkey" PRIMARY KEY ("Id_blog_cat")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_Category_id_fkey" FOREIGN KEY ("Category_id") REFERENCES "Blog_category"("Id_blog_cat") ON DELETE RESTRICT ON UPDATE CASCADE;
