-- SQLBook: Code
CREATE TYPE "public"."user_role" AS ENUM('user', 'agent', 'developer');--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"profile_url" varchar
);
