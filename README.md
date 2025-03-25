# Send.me
<p>Send.me est une application web permettant d'envoyer facilement des fichiers entre utilisateurs. L'application se compose de deux parties principales : un backend développé en Java avec Spring Boot et un frontend développé en React avec NextJS.</p>

## Prérequis
Avant de démarrer, vous devez avoir les éléments suivants installés sur votre machine :

- Docker Desktop : Pour gérer les conteneurs Docker.

- docker-compose : Outil permettant de définir et de gérer plusieurs conteneurs Docker.

## Lancer l'application
Une fois Docker Desktop installé et configuré, vous pouvez facilement démarrer l'application en utilisant Docker Compose.

1. Cloner le repository
```bash
git clone https://github.com/SteveHoareau18/send.me
cd send.me
```

2. Lancer Docker Compose
Dans le dossier du projet, exécutez la commande suivante pour démarrer les conteneurs Docker :

```bash
docker compose up -d
```

3. Accéder à l'application
Une fois les conteneurs lancés, vous pouvez accéder à l'application :

Frontend (Interface utilisateur) : http://localhost:3000

Backend (API) : http://localhost:8000

Fonctionnalités
Frontend : Permet à l'utilisateur de sélectionner des fichiers et de les envoyer via l'API du backend.

Backend : Fournit une API RESTFUL STATELESS qui accepte les fichiers envoyés et les stocke dans une base de données.

## Collaborateurs
- Steve HOAREAU

- Nassim MOSLEH

- Safae IZOUKA

## À l'attention de Mickael Berger
