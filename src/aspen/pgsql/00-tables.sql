create table charity(
    CharityId UUID PRIMARY KEY NOT NULL,
    CharityName text Not Null UNIQUE,
    CharitySubDomain text Not Null UNIQUE,
    CharityDescription Text Not NULL
)
