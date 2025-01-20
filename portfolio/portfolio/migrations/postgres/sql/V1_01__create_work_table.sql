-- Sequence: "Work__id_seq"

-- DROP SEQUENCE "Work__id_seq";

CREATE SEQUENCE "Work__id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE "Work__id_seq"
  OWNER TO postgres;

-- Table: "Work"

-- DROP TABLE "Work";

CREATE TABLE "Work"
(
  id integer NOT NULL DEFAULT nextval('"Work__id_seq"'::regclass),
  title character varying(100) NOT NULL,
  description character varying(150),
  link character varying(250),
  image character varying(250),
  "createdDate" timestamp with time zone NOT NULL,
  CONSTRAINT "Work_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Work"
  OWNER TO postgres;
