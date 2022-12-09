--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."Teams" DROP CONSTRAINT IF EXISTS "FK_Teams_Persons_OwnerID";
ALTER TABLE IF EXISTS ONLY public."Teams" DROP CONSTRAINT IF EXISTS "FK_Teams_Events_EventID";
ALTER TABLE IF EXISTS ONLY public."Registrations" DROP CONSTRAINT IF EXISTS "FK_Registrations_Teams_TeamID";
ALTER TABLE IF EXISTS ONLY public."Registrations" DROP CONSTRAINT IF EXISTS "FK_Registrations_Persons_OwnerID";
ALTER TABLE IF EXISTS ONLY public."PersonRegistrations" DROP CONSTRAINT IF EXISTS "FK_PersonRegistrations_Registrations_RegistrationID";
ALTER TABLE IF EXISTS ONLY public."PersonRegistrations" DROP CONSTRAINT IF EXISTS "FK_PersonRegistrations_Persons_PersonID";
ALTER TABLE IF EXISTS ONLY public."Donations" DROP CONSTRAINT IF EXISTS "FK_Donations_Teams_TeamID";
ALTER TABLE IF EXISTS ONLY public."Donations" DROP CONSTRAINT IF EXISTS "FK_Donations_Persons_PersonID";
ALTER TABLE IF EXISTS ONLY public."Donations" DROP CONSTRAINT IF EXISTS "FK_Donations_Events_EventID";
DROP INDEX IF EXISTS public."IX_Teams_OwnerID";
DROP INDEX IF EXISTS public."IX_Teams_EventID";
DROP INDEX IF EXISTS public."IX_Registrations_TeamID";
DROP INDEX IF EXISTS public."IX_Registrations_OwnerID";
DROP INDEX IF EXISTS public."IX_PersonRegistrations_RegistrationID";
DROP INDEX IF EXISTS public."IX_PersonRegistrations_PersonID";
DROP INDEX IF EXISTS public."IX_PageData_Key";
DROP INDEX IF EXISTS public."IX_Donations_TeamID";
DROP INDEX IF EXISTS public."IX_Donations_PersonID";
DROP INDEX IF EXISTS public."IX_Donations_EventID";
ALTER TABLE IF EXISTS ONLY public."__EFMigrationsHistory" DROP CONSTRAINT IF EXISTS "PK___EFMigrationsHistory";
ALTER TABLE IF EXISTS ONLY public."Teams" DROP CONSTRAINT IF EXISTS "PK_Teams";
ALTER TABLE IF EXISTS ONLY public."Registrations" DROP CONSTRAINT IF EXISTS "PK_Registrations";
ALTER TABLE IF EXISTS ONLY public."Persons" DROP CONSTRAINT IF EXISTS "PK_Persons";
ALTER TABLE IF EXISTS ONLY public."PersonRegistrations" DROP CONSTRAINT IF EXISTS "PK_PersonRegistrations";
ALTER TABLE IF EXISTS ONLY public."PageData" DROP CONSTRAINT IF EXISTS "PK_PageData";
ALTER TABLE IF EXISTS ONLY public."Events" DROP CONSTRAINT IF EXISTS "PK_Events";
ALTER TABLE IF EXISTS ONLY public."Donations" DROP CONSTRAINT IF EXISTS "PK_Donations";
DROP TABLE IF EXISTS public."__EFMigrationsHistory";
DROP TABLE IF EXISTS public."Teams";
DROP TABLE IF EXISTS public."Registrations";
DROP TABLE IF EXISTS public."Persons";
DROP TABLE IF EXISTS public."PersonRegistrations";
DROP TABLE IF EXISTS public."PageData";
DROP TABLE IF EXISTS public."Events";
DROP TABLE IF EXISTS public."Donations";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Donations; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."Donations" (
    "ID" bigint NOT NULL,
    "EventID" bigint NOT NULL,
    "TeamID" bigint,
    "PersonID" bigint,
    "Date" timestamp with time zone NOT NULL,
    "Amount" numeric NOT NULL,
    "IsPledge" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Donations" OWNER TO aspen;

--
-- Name: Donations_ID_seq; Type: SEQUENCE; Schema: public; Owner: aspen
--

ALTER TABLE public."Donations" ALTER COLUMN "ID" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Donations_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Events; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."Events" (
    "ID" bigint NOT NULL,
    "Date" timestamp with time zone NOT NULL,
    "Location" text DEFAULT ''::text NOT NULL,
    "Description" text DEFAULT ''::text NOT NULL,
    "Title" text DEFAULT ''::text NOT NULL,
    "DonationTarget" numeric DEFAULT 0.0 NOT NULL,
    "MainImage" text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Events" OWNER TO aspen;

--
-- Name: Events_ID_seq; Type: SEQUENCE; Schema: public; Owner: aspen
--

ALTER TABLE public."Events" ALTER COLUMN "ID" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Events_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: PageData; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."PageData" (
    "ID" bigint NOT NULL,
    "Key" text DEFAULT ''::text NOT NULL,
    "Data" jsonb NOT NULL
);


ALTER TABLE public."PageData" OWNER TO aspen;

--
-- Name: PageData_ID_seq; Type: SEQUENCE; Schema: public; Owner: aspen
--

ALTER TABLE public."PageData" ALTER COLUMN "ID" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."PageData_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: PersonRegistrations; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."PersonRegistrations" (
    "ID" bigint NOT NULL,
    "PersonID" bigint NOT NULL,
    "RegistrationID" bigint NOT NULL,
    "CreatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."PersonRegistrations" OWNER TO aspen;

--
-- Name: PersonRegistrations_ID_seq; Type: SEQUENCE; Schema: public; Owner: aspen
--

ALTER TABLE public."PersonRegistrations" ALTER COLUMN "ID" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."PersonRegistrations_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Persons; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."Persons" (
    "ID" bigint NOT NULL,
    "AuthID" text DEFAULT ''::text NOT NULL,
    "Name" text DEFAULT ''::text NOT NULL,
    "Bio" text
);


ALTER TABLE public."Persons" OWNER TO aspen;

--
-- Name: Persons_ID_seq; Type: SEQUENCE; Schema: public; Owner: aspen
--

ALTER TABLE public."Persons" ALTER COLUMN "ID" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Persons_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Registrations; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."Registrations" (
    "ID" bigint NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL,
    "IsPublic" boolean NOT NULL,
    "Nickname" text,
    "OwnerID" bigint NOT NULL,
    "TeamID" bigint NOT NULL
);


ALTER TABLE public."Registrations" OWNER TO aspen;

--
-- Name: Registrations_ID_seq; Type: SEQUENCE; Schema: public; Owner: aspen
--

ALTER TABLE public."Registrations" ALTER COLUMN "ID" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Registrations_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Teams; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."Teams" (
    "ID" bigint NOT NULL,
    "Description" text DEFAULT ''::text NOT NULL,
    "MainImage" text DEFAULT ''::text NOT NULL,
    "OwnerID" bigint NOT NULL,
    "EventID" bigint NOT NULL,
    "Name" character varying(128) DEFAULT ''::character varying NOT NULL,
    "DonationTarget" numeric DEFAULT 0.0 NOT NULL,
    "IsPublic" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Teams" OWNER TO aspen;

--
-- Name: Teams_ID_seq; Type: SEQUENCE; Schema: public; Owner: aspen
--

ALTER TABLE public."Teams" ALTER COLUMN "ID" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Teams_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: aspen
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO aspen;

--
-- Data for Name: Donations; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."Donations" ("ID", "EventID", "TeamID", "PersonID", "Date", "Amount", "IsPledge") FROM stdin;
\.


--
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."Events" ("ID", "Date", "Location", "Description", "Title", "DonationTarget", "MainImage") FROM stdin;
4	2023-07-04 21:41:19.519+00	4th of July Carnival	Rides, Auctions, Games, and more	4th Carnival	10000	string
3	2023-05-06 21:41:19.519+00	Snow College	The Seniors are graduating	Graduation	500	string
5	2023-12-25 21:41:19.519+00	Food Bank	Come give some food so that those who don't have enough themselves can have a merry Christmas	Christmas Fundraiser	5000	string
2	2023-02-14 21:41:19.519+00	Farm	Sister's B-Day	Birthday	50	string
\.


--
-- Data for Name: PageData; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."PageData" ("ID", "Key", "Data") FROM stdin;
\.


--
-- Data for Name: PersonRegistrations; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."PersonRegistrations" ("ID", "PersonID", "RegistrationID", "CreatedDate") FROM stdin;
\.


--
-- Data for Name: Persons; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."Persons" ("ID", "AuthID", "Name", "Bio") FROM stdin;
1	testId1	Jayse B	Senior at Snow College
2	testId2	Jesse M	Senior at Snow College
3	testId3	Durli H	Senior at Snow College
4	testId4	Sergio A	Senior at Snow College
5	testId5	Trent E	Senior at Snow College
6	admin@projectaspen.org	aspen admin	\N
\.


--
-- Data for Name: Registrations; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."Registrations" ("ID", "CreationDate", "IsPublic", "Nickname", "OwnerID", "TeamID") FROM stdin;
\.


--
-- Data for Name: Teams; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."Teams" ("ID", "Description", "MainImage", "OwnerID", "EventID", "Name", "DonationTarget", "IsPublic") FROM stdin;
1	TestingTeam	string	3	3	TestTeam1Public	50	t
2	TestingTeam	string	2	3	TestTeam1Private	100	f
3	TestingTeam	string	4	5	TestTeam2Public	1000	t
4	TestingTeam	string	1	5	TestTeam2Private	1000	f
5	All the aspen admins will join this team.	f42825bf-84a5-4b80-9775-4ee96811a213.jfif	6	2	Administrators!	64	t
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: aspen
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20211021045038_recordDbModels	6.0.10
20211028151658_MakePageDataKeyUnique	6.0.10
20211106022222_AddedEventTitle	6.0.10
20211116051848_AddNameColumnToTeam	6.0.10
20211122213424_AddDonationTable	6.0.10
20211123150738_RenamePendingColumn	6.0.10
20211123152418_AddDonationTargetToEvent	6.0.10
20211203211130_AddDonationTargetToTeam	6.0.10
20221104222427_MigrateToEF6	6.0.10
20221107042731_IsPledge	6.0.10
20221115171355_PublicPrivateTeam	6.0.10
20221201024052_Added New DataModel to the Team	6.0.10
\.


--
-- Name: Donations_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: aspen
--

SELECT pg_catalog.setval('public."Donations_ID_seq"', 1, false);


--
-- Name: Events_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: aspen
--

SELECT pg_catalog.setval('public."Events_ID_seq"', 5, true);


--
-- Name: PageData_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: aspen
--

SELECT pg_catalog.setval('public."PageData_ID_seq"', 1, false);


--
-- Name: PersonRegistrations_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: aspen
--

SELECT pg_catalog.setval('public."PersonRegistrations_ID_seq"', 1, false);


--
-- Name: Persons_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: aspen
--

SELECT pg_catalog.setval('public."Persons_ID_seq"', 6, true);


--
-- Name: Registrations_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: aspen
--

SELECT pg_catalog.setval('public."Registrations_ID_seq"', 1, false);


--
-- Name: Teams_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: aspen
--

SELECT pg_catalog.setval('public."Teams_ID_seq"', 5, true);


--
-- Name: Donations PK_Donations; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "PK_Donations" PRIMARY KEY ("ID");


--
-- Name: Events PK_Events; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "PK_Events" PRIMARY KEY ("ID");


--
-- Name: PageData PK_PageData; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."PageData"
    ADD CONSTRAINT "PK_PageData" PRIMARY KEY ("ID");


--
-- Name: PersonRegistrations PK_PersonRegistrations; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."PersonRegistrations"
    ADD CONSTRAINT "PK_PersonRegistrations" PRIMARY KEY ("ID");


--
-- Name: Persons PK_Persons; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Persons"
    ADD CONSTRAINT "PK_Persons" PRIMARY KEY ("ID");


--
-- Name: Registrations PK_Registrations; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Registrations"
    ADD CONSTRAINT "PK_Registrations" PRIMARY KEY ("ID");


--
-- Name: Teams PK_Teams; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Teams"
    ADD CONSTRAINT "PK_Teams" PRIMARY KEY ("ID");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: IX_Donations_EventID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_Donations_EventID" ON public."Donations" USING btree ("EventID");


--
-- Name: IX_Donations_PersonID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_Donations_PersonID" ON public."Donations" USING btree ("PersonID");


--
-- Name: IX_Donations_TeamID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_Donations_TeamID" ON public."Donations" USING btree ("TeamID");


--
-- Name: IX_PageData_Key; Type: INDEX; Schema: public; Owner: aspen
--

CREATE UNIQUE INDEX "IX_PageData_Key" ON public."PageData" USING btree ("Key");


--
-- Name: IX_PersonRegistrations_PersonID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_PersonRegistrations_PersonID" ON public."PersonRegistrations" USING btree ("PersonID");


--
-- Name: IX_PersonRegistrations_RegistrationID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_PersonRegistrations_RegistrationID" ON public."PersonRegistrations" USING btree ("RegistrationID");


--
-- Name: IX_Registrations_OwnerID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_Registrations_OwnerID" ON public."Registrations" USING btree ("OwnerID");


--
-- Name: IX_Registrations_TeamID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_Registrations_TeamID" ON public."Registrations" USING btree ("TeamID");


--
-- Name: IX_Teams_EventID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_Teams_EventID" ON public."Teams" USING btree ("EventID");


--
-- Name: IX_Teams_OwnerID; Type: INDEX; Schema: public; Owner: aspen
--

CREATE INDEX "IX_Teams_OwnerID" ON public."Teams" USING btree ("OwnerID");


--
-- Name: Donations FK_Donations_Events_EventID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "FK_Donations_Events_EventID" FOREIGN KEY ("EventID") REFERENCES public."Events"("ID") ON DELETE CASCADE;


--
-- Name: Donations FK_Donations_Persons_PersonID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "FK_Donations_Persons_PersonID" FOREIGN KEY ("PersonID") REFERENCES public."Persons"("ID") ON DELETE RESTRICT;


--
-- Name: Donations FK_Donations_Teams_TeamID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "FK_Donations_Teams_TeamID" FOREIGN KEY ("TeamID") REFERENCES public."Teams"("ID") ON DELETE RESTRICT;


--
-- Name: PersonRegistrations FK_PersonRegistrations_Persons_PersonID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."PersonRegistrations"
    ADD CONSTRAINT "FK_PersonRegistrations_Persons_PersonID" FOREIGN KEY ("PersonID") REFERENCES public."Persons"("ID") ON DELETE CASCADE;


--
-- Name: PersonRegistrations FK_PersonRegistrations_Registrations_RegistrationID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."PersonRegistrations"
    ADD CONSTRAINT "FK_PersonRegistrations_Registrations_RegistrationID" FOREIGN KEY ("RegistrationID") REFERENCES public."Registrations"("ID") ON DELETE CASCADE;


--
-- Name: Registrations FK_Registrations_Persons_OwnerID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Registrations"
    ADD CONSTRAINT "FK_Registrations_Persons_OwnerID" FOREIGN KEY ("OwnerID") REFERENCES public."Persons"("ID") ON DELETE CASCADE;


--
-- Name: Registrations FK_Registrations_Teams_TeamID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Registrations"
    ADD CONSTRAINT "FK_Registrations_Teams_TeamID" FOREIGN KEY ("TeamID") REFERENCES public."Teams"("ID") ON DELETE CASCADE;


--
-- Name: Teams FK_Teams_Events_EventID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Teams"
    ADD CONSTRAINT "FK_Teams_Events_EventID" FOREIGN KEY ("EventID") REFERENCES public."Events"("ID") ON DELETE CASCADE;


--
-- Name: Teams FK_Teams_Persons_OwnerID; Type: FK CONSTRAINT; Schema: public; Owner: aspen
--

ALTER TABLE ONLY public."Teams"
    ADD CONSTRAINT "FK_Teams_Persons_OwnerID" FOREIGN KEY ("OwnerID") REFERENCES public."Persons"("ID") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

