ALTER TABLE IF EXISTS public."Work"
    ADD COLUMN "updatedDate" timestamp with time zone DEFAULT NOW();