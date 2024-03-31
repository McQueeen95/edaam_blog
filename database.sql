CREATE EXTENSION if not EXISTS "uuid-ossp";

CREATE DATABASE AlhamlaDB2;

create table Blog(
    Article_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    Article_title_AR VARCHAR(255) not null,
    Article_title_EN VARCHAR(255),
    Post_date timestamp not null default CURRENT_TIMESTAMP,
    image text default 'https://wallpapercave.com/wp/wp3445224.png',
    Article_content TEXT not null,
    Id_blog_cat uuid not null references Blog_category(Id_blog_cat)
);


create table Blog_category(
    Id_blog_cat UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    Category_name_AR VARCHAR(255) not null,
    Article_title_EN VARCHAR(255)
);
