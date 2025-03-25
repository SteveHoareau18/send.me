FROM eclipse-temurin:23-jdk-alpine

RUN apk add --no-cache gradle bash

WORKDIR /app

COPY . .

CMD ["sh", "-c", "gradle build && gradle bootRun"]