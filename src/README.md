# How do I run the app?

```bash
docker-compose up -d --build
```

# Do I need to do any first time setup?

No, the keycloak (auth service) database is being restored from a backup the first time you run the app. 

# How do I access Keycloak?

There is an 'admin'/'admin' user you can use to access the keycloak management console on http://localhost/auth.

# How do I access the app?

After you have turned on the app with docker-compose you can access the page at http://localhost. There are two users 'user'/'password' and 'aspenadmin'/'password'. The later contains the aspen-admin role.

# What if I made some changes to keycloak that I want to add to the repo?

You need to create a new backup of the keycloak database. This command will create a dump file:

```bash
docker exec -t auth_db pg_dump -U keycloak > backup.sql
```

Then move the backup.sql file to the dev-resources/keycloak directory.

