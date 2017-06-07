INSERT INTO comic (id, title, posted_date) SELECT comic_num, comic_name, date FROM lolable.comics;
INSERT INTO blog (id, title, blog, posted_date) SELECT id, title, blog, time FROM lolable.blogs;
