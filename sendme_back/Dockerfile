FROM eclipse-temurin:23-jdk-alpine

RUN apk add --no-cache gradle bash

WORKDIR /app

COPY . .

CMD ["gradle", "build", "--no-daemon", "--continuous", "&&", "gradle", "bootRun"]