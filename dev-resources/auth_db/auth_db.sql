CREATE TABLE public.page_data
(
    key character varying(64) NOT NULL,
    data jsonb NOT NULL,
    PRIMARY KEY (key)
);
