CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL UNIQUE,
	"pic_url" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT false,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"owner" int NOT NULL,
	"link" TEXT NOT NULL,
	"description" TEXT,
	"deleted" BOOLEAN NOT NULL DEFAULT false,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "tags_pivot" (
	"id" serial NOT NULL,
	"post_id" int NOT NULL,
	"tag_id" int NOT NULL,
	CONSTRAINT "tags_pivot_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"name" varchar(60) NOT NULL,
	"mentions" int NOT NULL DEFAULT 0,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"post_id" int NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "reposts" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"post_id" int NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT "reposts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"comment" TEXT NOT NULL,
	"user_id" int NOT NULL,
	"post_id" int NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "follows" (
	"id" serial NOT NULL,
	"follower_id" int NOT NULL,
	"user_id" int NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT "follows_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("owner") REFERENCES "users"("id");

ALTER TABLE "tags_pivot" ADD CONSTRAINT "tags_pivot_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE "tags_pivot" ADD CONSTRAINT "tags_pivot_fk1" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id"); 

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id"); 

ALTER TABLE "follows" ADD CONSTRAINT "follows_fk0" FOREIGN KEY ("follower_id") REFERENCES "users"("id");
ALTER TABLE "follows" ADD CONSTRAINT "follows_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
