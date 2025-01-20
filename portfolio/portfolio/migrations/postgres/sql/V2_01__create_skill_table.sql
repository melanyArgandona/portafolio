-- Sequence: "Skill__id_seq"

-- DROP SEQUENCE "Skill__id_seq";

CREATE SEQUENCE "Skill__id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE "Skill__id_seq"
  OWNER TO postgres;

-- Table: "Skill"

-- DROP TABLE "Skill";

CREATE TABLE "Skill" (
  id integer NOT NULL DEFAULT nextval('"Skill__id_seq"'::regclass),
  area character varying(150) NOT NULL,
  "subArea" character varying(150) NOT NULL,
  skill character varying(150) NOT NULL,
  level integer NOT NULL,
  "createdDate" timestamp with time zone NOT NULL,
  CONSTRAINT "Skill_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Skill"
  OWNER TO postgres;

-- Index: unique_area_subarea_skill

-- DROP INDEX unique_area_subarea_skill;

CREATE UNIQUE INDEX unique_area_subarea_skill
  ON "Skill"
  USING btree
  ("area", "subArea", "skill");