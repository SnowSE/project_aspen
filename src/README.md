# How do I run the app?

0. Get Docker running on your machine. 
1. Accquire an instance of Ubuntu (WSL), either from Microsoft Store or Other means

    *Note*: make sure WSL is version 2 by using the command `wsl --set-version <distro> 2` (do this from command prompt)

    *Note*: Make sure your docker has WSL enabled in your Docker Desktop, go to Resources>WSL Integration, make sure you see your distro as a toggle, if not, you are not in wsl version 2.



2. Configure WSL for SSH

```bash
cp -r /mnt/c/users/yourwindowsusername/.ssh ~/
chown -R yourwslusername. ~/.ssh/ #NOTE: The trailing . after your linux user name is IMPORTANT.
chmod 700 ~/.ssh/
chmod 600 ~/.ssh/id_rsa*
chmod 644 ~/.ssh/known_hosts
git config --global user.email "your@email.com"
git config --global user.name "Your Name"
```

If you don't have a .ssh folder in your windows user profile directory just run "ssh-keygen" from within WSL.

3. Clone the project_aspen repo into the directory 

```bash
mkdir ~/git
cd ~/git
git clone git@github.com:SnowSE/project_aspen.git
```

*Note:* If you have already cloned the repo over https, run the following commands to tell git to use SSH

```bash
git remote remove origin
git remote add origin git@github.com:/SnowSE/project_aspen.git
```

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

