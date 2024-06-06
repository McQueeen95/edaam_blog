-- AlterTable
ALTER TABLE "blog" ALTER COLUMN "Update_date" SET DEFAULT CURRENT_TIMESTAMP;

-- migration.sql

-- Ensure uuid-ossp extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Alter the table to set the default value for Article_id
ALTER TABLE "blog"
ALTER COLUMN "Article_id" SET DEFAULT uuid_generate_v4();
