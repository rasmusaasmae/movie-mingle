ALTER TABLE "movies" ADD COLUMN "original_title" text;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "tagline" text;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "runtime" integer;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "original_language" text;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "popularity" real;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "adult" boolean;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "belongs_to_collection_id" integer;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "belongs_to_collection_name" text;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "belongs_to_collection_poster_path" text;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "belongs_to_collection_backdrop_path" text;