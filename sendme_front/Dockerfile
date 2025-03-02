FROM node:18-alpine
# Définit le répertoire de travail
WORKDIR /app
# Copie les fichiers package.json et package-lock.json pour la mise en cache
COPY package*.json ./
# Installe les dépendances
RUN npm install
# Copie le reste des fichiers
COPY . .
# Exécute l'application React en mode développement
CMD ["npm", "start"]