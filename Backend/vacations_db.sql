--
-- PostgreSQL database dump
--

\restrict hRMlj8YEKUFY5ssc7eDa8i2k1Lch0fj3uRZhqDvf7niT5CFMZIsHbRgfbR9U5rZ

-- Dumped from database version 18.7 (a21afb5)
-- Dumped by pg_dump version 18.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    user_id integer NOT NULL,
    vacation_id integer NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'User'::character varying NOT NULL
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: vacations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vacations (
    vacation_id integer NOT NULL,
    destination character varying(100) NOT NULL,
    description text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    price numeric(10,2) NOT NULL,
    image_filename character varying(255) NOT NULL,
    CONSTRAINT vacations_price_check CHECK (((price >= (0)::numeric) AND (price <= (10000)::numeric)))
);


--
-- Name: vacations_vacation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.vacations ALTER COLUMN vacation_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vacations_vacation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.likes (user_id, vacation_id) FROM stdin;
2	5
2	11
2	1
3	5
3	8
3	12
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, first_name, last_name, email, password, role) FROM stdin;
1	James	Palmer	jamesp@example.com	$2b$10$LR5wpOhgWWVv.SMIDysNZuOajgan44M1eulplN0kbz/ZXJ88ri.yi	Admin
2	Melanie	Palmer	mpalmer@example.com	$2b$10$.Bsr3iYKo7GZWW7NF.vpUe8j01cIcD5eRcj.YWvKHv3wi5jQzO0sS	User
3	Alice	Lorat	al@example.com	$2b$10$LAZA7bJ7uYQi/kUT3AXN2.nTATJwsFO/9/fdSYuJFySyJJudAS0V.	User
\.


--
-- Data for Name: vacations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vacations (vacation_id, destination, description, start_date, end_date, price, image_filename) FROM stdin;
1	London, UK	Discover iconic landmarks like Big Ben, the Tower of London, and world-class museums.	2026-08-01	2026-08-08	1250.00	london.jpg
2	Rome, Italy	Explore ancient wonders at the Colosseum, the Roman Forum, and authentic Italian dining.	2026-08-15	2026-08-22	1100.00	rome.jpg
3	Paris, France	Stroll through the City of Light, admire the Eiffel Tower, and tour famous art galleries.	2026-09-01	2026-09-08	1350.00	paris.jpg
4	Amsterdam, Netherlands	Cruise along picturesque canals, ride bicycles, and visit historic Dutch museums.	2026-09-15	2026-09-22	980.00	amsterdam.jpg
5	Barcelona, Spain	Experience stunning Gaudí architecture, vibrant street life, and Mediterranean beaches.	2026-11-10	2026-11-20	1050.00	barcelona.jpg
6	Valletta, Malta	Uncover rich fortress history, Grand Harbour vistas, and sunny coastal charm.	2026-11-12	2026-11-25	890.00	valletta.jpg
7	Zurich, Switzerland	Enjoy scenic Alpine lake views, luxury boutique shopping, and historic Old Town streets.	2026-11-15	2026-11-30	1850.00	zurich.jpg
8	Prague, Czech Republic	Walk across the historic Charles Bridge and explore enchanting Gothic castles.	2026-12-01	2026-12-08	820.00	prague.jpg
9	Rhodes, Greece	Relax on golden Aegean beaches and wander through medieval knight fortresses.	2026-12-15	2026-12-22	920.00	rhodes.jpg
10	Bucharest, Romania	Tour grand neoclassical architecture, lively old-town cafes, and historic landmarks.	2027-01-10	2027-01-17	750.00	bucharest.jpg
11	Budapest, Hungary	Soak in world-famous thermal baths and take evening Danube river cruises.	2027-02-01	2027-02-08	880.00	budapest.jpg
12	Heraklion, Crete	Discover ancient Minoan ruins at Knossos and crystal-clear Greek island waters.	2027-03-01	2027-03-08	960.00	heraklion.jpg
13	Tokyo, Japan	Updated: Explore Shibuya crossing and Mount Fuji. Enjoy local cuisine	2027-04-01	2027-04-10	1600.00	tokyo.jpg
14	Vienna, Austria	Experience imperial palaces, classical music concerts, and historic coffee houses	2026-11-15	2026-11-24	1150.00	1794674954788-113726118.jpg
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: vacations_vacation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vacations_vacation_id_seq', 14, true);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (user_id, vacation_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: vacations vacations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacations
    ADD CONSTRAINT vacations_pkey PRIMARY KEY (vacation_id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: likes likes_vacation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_vacation_id_fkey FOREIGN KEY (vacation_id) REFERENCES public.vacations(vacation_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict hRMlj8YEKUFY5ssc7eDa8i2k1Lch0fj3uRZhqDvf7niT5CFMZIsHbRgfbR9U5rZ

