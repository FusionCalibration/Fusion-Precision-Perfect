CREATE TABLE "admin_sessions" (
  "id" serial PRIMARY KEY NOT NULL,
  "admin_id" integer NOT NULL,
  "token_hash" text NOT NULL,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "last_seen_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "admin_sessions_token_hash_unique" UNIQUE("token_hash"),
  CONSTRAINT "admin_sessions_admin_id_admins_id_fk"
    FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id")
    ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX "admin_sessions_admin_id_idx" ON "admin_sessions" USING btree ("admin_id");
