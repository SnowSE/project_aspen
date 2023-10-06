docker exec -t keycloak_db pg_dump -c -U keycloak keycloak > backup-staging.sql
