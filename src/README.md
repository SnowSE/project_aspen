# How do I run the app?

```bash
docker-compose up -d --build
```

# Do I need to do any first time setup?

No, the keycloak (auth service) database is being restored from a backup the first time you run the app. There is an 'admin'/'admin' user and a 'user'/'password' user. you can access the keycloak management console on http://localhost/auth.

# What if I made some changes to keycloak that I want to add to the repo?

You need to create a new backup of the keycloak database. This command will create a dump file:

```bash
docker exec -t auth_db pg_dump -U keycloak > backup.sql
```

Then move the backup.sql file to the dev-resources/keycloak directory.