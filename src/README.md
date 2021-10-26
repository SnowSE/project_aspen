# How do I run the app?

0. Get Docker running on your machine. 
1. Accquire an instance of Ubuntu (WSL), either from Microsoft Store or Other means

    *Note*: make sure WSL is version 2 by using the command `wsl --set-version <distro> 2` (do this from command prompt)

    *Note*: Make sure your docker has WSL enabled in your Docker Desktop, go to Resources>WSL Integration, make sure you see your distro as a toggle, if not, you are not in wsl version 2.


2. Inside of the ubuntu instance, create a directory to make sure you are in Linux, not Windows

    *Note*: Using mkdir ~/git will make a linux directory that you can cd into

3. Clone the Aspen_Project repo into the directory 
4. Get into the directory, e.g. `~/git/project_aspen/src`, and open it in vscode with `code .`
5. **IMPORTANT** Make sure you reopen the folder in a container from the popup when you open src in vscode 

    *Note*: If you miss the notification, you can click on the green button in the bottom left of vscode, and choose to reopen it in a dev container from there. 

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

