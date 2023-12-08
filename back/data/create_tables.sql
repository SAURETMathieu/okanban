BEGIN;

-- On nettoie la db si elle contient déjà nos tables
DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

-- On crée les tables
CREATE TABLE "list" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "position" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "content" TEXT NOT NULL,
  "color" TEXT NOT NULL DEFAULT '#ffffff',
  "position" INT NOT NULL DEFAULT 0,
  "list_id" INT NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tag" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "color" TEXT NOT NULL DEFAULT '#ffffff',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_tag" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "card_id" INT NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "tag_id" INT NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE ("card_id", "tag_id")
);

COMMIT;
