CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"active" boolean DEFAULT true NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"birth_date" date,
	"gender" text,
	"phone" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
