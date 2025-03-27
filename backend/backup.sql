--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3 (Debian 17.3-3.pgdg120+1)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg24.04+2)

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

--
-- Name: enum_orders_paymentStatus; Type: TYPE; Schema: public; Owner: sachindu
--

CREATE TYPE public."enum_orders_paymentStatus" AS ENUM (
    'Unpaid',
    'Paid'
);


ALTER TYPE public."enum_orders_paymentStatus" OWNER TO sachindu;

--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: sachindu
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Canceled'
);


ALTER TYPE public.enum_orders_status OWNER TO sachindu;

--
-- Name: enum_products_category; Type: TYPE; Schema: public; Owner: sachindu
--

CREATE TYPE public.enum_products_category AS ENUM (
    'Genuine Original',
    'Branded',
    'Non-Branded'
);


ALTER TYPE public.enum_products_category OWNER TO sachindu;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admins; Type: TABLE; Schema: public; Owner: sachindu
--

CREATE TABLE public."Admins" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Admins" OWNER TO sachindu;

--
-- Name: Admins_id_seq; Type: SEQUENCE; Schema: public; Owner: sachindu
--

CREATE SEQUENCE public."Admins_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Admins_id_seq" OWNER TO sachindu;

--
-- Name: Admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sachindu
--

ALTER SEQUENCE public."Admins_id_seq" OWNED BY public."Admins".id;


--
-- Name: Carts; Type: TABLE; Schema: public; Owner: sachindu
--

CREATE TABLE public."Carts" (
    id integer NOT NULL,
    "userId" integer,
    "productId" integer,
    quantity integer DEFAULT 1,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Carts" OWNER TO sachindu;

--
-- Name: Carts_id_seq; Type: SEQUENCE; Schema: public; Owner: sachindu
--

CREATE SEQUENCE public."Carts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Carts_id_seq" OWNER TO sachindu;

--
-- Name: Carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sachindu
--

ALTER SEQUENCE public."Carts_id_seq" OWNED BY public."Carts".id;


--
-- Name: Orders; Type: TABLE; Schema: public; Owner: sachindu
--

CREATE TABLE public."Orders" (
    id integer NOT NULL,
    "userId" integer,
    total double precision,
    "trackingNumber" character varying(255),
    status character varying(255) DEFAULT 'Pending'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Orders" OWNER TO sachindu;

--
-- Name: Orders_id_seq; Type: SEQUENCE; Schema: public; Owner: sachindu
--

CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Orders_id_seq" OWNER TO sachindu;

--
-- Name: Orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sachindu
--

ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;


--
-- Name: Products; Type: TABLE; Schema: public; Owner: sachindu
--

CREATE TABLE public."Products" (
    id integer NOT NULL,
    name character varying(255),
    model character varying(255),
    brand character varying(255),
    description text,
    price double precision,
    discount double precision DEFAULT '0'::double precision,
    stock integer,
    images json DEFAULT '[]'::json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Products" OWNER TO sachindu;

--
-- Name: Products_id_seq; Type: SEQUENCE; Schema: public; Owner: sachindu
--

CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Products_id_seq" OWNER TO sachindu;

--
-- Name: Products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sachindu
--

ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;


--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: sachindu
--

CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "userId" integer,
    rating integer NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Reviews" OWNER TO sachindu;

--
-- Name: Reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: sachindu
--

CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reviews_id_seq" OWNER TO sachindu;

--
-- Name: Reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sachindu
--

ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: sachindu
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    "fullName" character varying(255),
    email character varying(255),
    password character varying(255),
    role character varying(255) DEFAULT 'user'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO sachindu;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: sachindu
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO sachindu;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sachindu
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Wishlists; Type: TABLE; Schema: public; Owner: sachindu
--

CREATE TABLE public."Wishlists" (
    id integer NOT NULL,
    "userId" integer,
    "productId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Wishlists" OWNER TO sachindu;

--
-- Name: Wishlists_id_seq; Type: SEQUENCE; Schema: public; Owner: sachindu
--

CREATE SEQUENCE public."Wishlists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Wishlists_id_seq" OWNER TO sachindu;

--
-- Name: Wishlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sachindu
--

ALTER SEQUENCE public."Wishlists_id_seq" OWNED BY public."Wishlists".id;


--
-- Name: Admins id; Type: DEFAULT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Admins" ALTER COLUMN id SET DEFAULT nextval('public."Admins_id_seq"'::regclass);


--
-- Name: Carts id; Type: DEFAULT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Carts" ALTER COLUMN id SET DEFAULT nextval('public."Carts_id_seq"'::regclass);


--
-- Name: Orders id; Type: DEFAULT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);


--
-- Name: Products id; Type: DEFAULT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);


--
-- Name: Reviews id; Type: DEFAULT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: Wishlists id; Type: DEFAULT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Wishlists" ALTER COLUMN id SET DEFAULT nextval('public."Wishlists_id_seq"'::regclass);


--
-- Data for Name: Admins; Type: TABLE DATA; Schema: public; Owner: sachindu
--

COPY public."Admins" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
1	Admin	sachindumihiran44@gmail.com	$2b$10$rbw.jH87fY6W2j/ydV/8CuxZ1q3SYX3faTOJ11tUxG14qkiS9iXji	2025-03-13 16:19:14.953426+00	2025-03-13 16:19:14.953426+00
\.


--
-- Data for Name: Carts; Type: TABLE DATA; Schema: public; Owner: sachindu
--

COPY public."Carts" (id, "userId", "productId", quantity, "createdAt", "updatedAt") FROM stdin;
2	2	1	3	2025-03-13 17:42:33.519+00	2025-03-13 17:42:33.519+00
\.


--
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: sachindu
--

COPY public."Orders" (id, "userId", total, "trackingNumber", status, "createdAt", "updatedAt") FROM stdin;
2	\N	2500	TRK1741887137305	Pending	2025-03-13 17:32:17.305+00	2025-03-13 17:32:17.305+00
1	2	2500	TRK1741887103469	Shipped	2025-03-13 17:31:43.469+00	2025-03-13 17:34:22.065+00
3	5	16000	TRK1741982060348	Pending	2025-03-14 19:54:20.349+00	2025-03-14 19:54:20.349+00
4	5	1000	TRK1741982123937	Pending	2025-03-14 19:55:23.937+00	2025-03-14 19:55:23.937+00
5	3	3000	TRK1741983746902	Pending	2025-03-14 20:22:26.902+00	2025-03-14 20:22:26.902+00
6	3	1000	TRK1741984137142	Pending	2025-03-14 20:28:57.143+00	2025-03-14 20:28:57.143+00
7	3	1000	TRK1741984376989	Pending	2025-03-14 20:32:56.99+00	2025-03-14 20:32:56.99+00
8	1	1000	TRK1741986775614	Pending	2025-03-14 21:12:55.615+00	2025-03-14 21:12:55.615+00
9	\N	250	TRK1742317129230	Pending	2025-03-18 16:58:49.231+00	2025-03-18 16:58:49.231+00
10	1	4900	TRK1742984022506	Pending	2025-03-26 10:13:42.508+00	2025-03-26 10:13:42.508+00
\.


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: sachindu
--

COPY public."Products" (id, name, model, brand, description, price, discount, stock, images, "createdAt", "updatedAt") FROM stdin;
6	Clutch Plate Set	CT100	Bajaj		655	0	110	["/uploads/1743046509618-ct100cp.jpg"]	2025-03-27 03:35:09.634+00	2025-03-27 03:49:00.899+00
7	Clutch Cable 	Dio	Honda	Quality	1500	0	50	["/uploads/1743051253686-ct100cp.jpg"]	2025-03-27 04:54:13.705+00	2025-03-27 04:54:13.705+00
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: sachindu
--

COPY public."Reviews" (id, "productId", "userId", rating, comment, "createdAt", "updatedAt") FROM stdin;
1	2	\N	4	Great quality!	2025-03-13 17:43:05.269+00	2025-03-13 17:43:05.269+00
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: sachindu
--

COPY public."Users" (id, "fullName", email, password, role, "createdAt", "updatedAt") FROM stdin;
1	John Updated	john.updated@example.com	$2b$10$FvtT8F1Wf0RyrylrwWbyMONpwWllT2qt6UZ13RZAtBzjv1CRyrzTK	user	2025-03-13 15:24:52.88+00	2025-03-13 15:51:10.082+00
2	John Doe Updated	john@example.com	$2b$10$4WwFbRdCYGwLK7zf.Z7eUeRMemfG8JgfoSt0CKqVp9C2yF95EIoue	user	2025-03-13 15:34:39.247+00	2025-03-13 17:51:21.89+00
3	test2	test2@gmail.com	$2b$10$i8.cRn5DX9L6bhTqlA3R/ujDVk..AJTdAZ9kJ2LkDZ7Cr5IDLiZs6	user	2025-03-13 18:39:20.572+00	2025-03-13 18:39:20.572+00
4	test3	test3@gmail.com	$2b$10$HFy.gN5PzHkc/ciRUBMCkO/W7M3OhjJA6wkrqBcVK2gE7WpS0u3Su	user	2025-03-13 18:50:26.436+00	2025-03-13 18:50:26.436+00
5	test4	test4@gmail.com	$2b$10$UkwvP7DWVrA3zbzCDHDkh.FHoeU4v7ehC58I962r6zMZvKxCNJgLO	user	2025-03-14 19:34:02.175+00	2025-03-14 19:34:02.175+00
\.


--
-- Data for Name: Wishlists; Type: TABLE DATA; Schema: public; Owner: sachindu
--

COPY public."Wishlists" (id, "userId", "productId", "createdAt", "updatedAt") FROM stdin;
2	2	1	2025-03-13 17:40:44.183+00	2025-03-13 17:40:44.183+00
3	2	1	2025-03-13 17:40:57.87+00	2025-03-13 17:40:57.87+00
4	5	1	2025-03-14 19:53:18.645+00	2025-03-14 19:53:18.645+00
5	5	1	2025-03-14 19:54:47.155+00	2025-03-14 19:54:47.155+00
6	5	1	2025-03-14 19:55:52.943+00	2025-03-14 19:55:52.943+00
7	3	1	2025-03-14 19:57:05.324+00	2025-03-14 19:57:05.324+00
8	3	1	2025-03-14 19:57:55.136+00	2025-03-14 19:57:55.136+00
9	3	1	2025-03-14 20:22:45.117+00	2025-03-14 20:22:45.117+00
10	1	1	2025-03-14 20:52:54.8+00	2025-03-14 20:52:54.8+00
11	1	1	2025-03-14 21:23:01.56+00	2025-03-14 21:23:01.56+00
12	1	1	2025-03-14 21:24:53.245+00	2025-03-14 21:24:53.245+00
13	1	2	2025-03-14 21:38:41.353+00	2025-03-14 21:38:41.353+00
14	1	3	2025-03-26 08:21:24.28+00	2025-03-26 08:21:24.28+00
\.


--
-- Name: Admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sachindu
--

SELECT pg_catalog.setval('public."Admins_id_seq"', 1, true);


--
-- Name: Carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sachindu
--

SELECT pg_catalog.setval('public."Carts_id_seq"', 2, true);


--
-- Name: Orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sachindu
--

SELECT pg_catalog.setval('public."Orders_id_seq"', 10, true);


--
-- Name: Products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sachindu
--

SELECT pg_catalog.setval('public."Products_id_seq"', 7, true);


--
-- Name: Reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sachindu
--

SELECT pg_catalog.setval('public."Reviews_id_seq"', 1, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sachindu
--

SELECT pg_catalog.setval('public."Users_id_seq"', 5, true);


--
-- Name: Wishlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sachindu
--

SELECT pg_catalog.setval('public."Wishlists_id_seq"', 14, true);


--
-- Name: Admins Admins_pkey; Type: CONSTRAINT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Admins"
    ADD CONSTRAINT "Admins_pkey" PRIMARY KEY (id);


--
-- Name: Carts Carts_pkey; Type: CONSTRAINT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Carts"
    ADD CONSTRAINT "Carts_pkey" PRIMARY KEY (id);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- Name: Reviews Reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Wishlists Wishlists_pkey; Type: CONSTRAINT; Schema: public; Owner: sachindu
--

ALTER TABLE ONLY public."Wishlists"
    ADD CONSTRAINT "Wishlists_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

