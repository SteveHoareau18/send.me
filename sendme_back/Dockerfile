# Utilise une image avec Java 21
FROM openjdk:21-jdk-slim

USER root

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers Maven pour la mise en cache des dépendances
COPY pom.xml ./
COPY src ./src

# Création d'un répertoire temporaire pour éviter le problème de suppression
RUN mkdir -p /tmp/sendme_build

EXPOSE 8000

# Exécute la commande de compilation et spécifie un répertoire cible temporaire
CMD ["./mvnw", "spring-boot:run"]

# Lancer l'application (lorsque le build réussit)
# CMD ["java", "-jar", "/tmp/sendme_build/sendme.jar"]
