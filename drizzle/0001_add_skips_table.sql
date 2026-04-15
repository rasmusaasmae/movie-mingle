CREATE TABLE "skips" (
	"imdb_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "skips_imdb_id_user_id_pk" PRIMARY KEY("imdb_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "skips" ADD CONSTRAINT "skips_imdb_id_movies_imdb_id_fk" FOREIGN KEY ("imdb_id") REFERENCES "public"."movies"("imdb_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skips" ADD CONSTRAINT "skips_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;