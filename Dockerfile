FROM httpd:alpine3.20@sha256:741553a657df26d0adb4e6403c0da1700fbb0dd4e0544a8e01eeea3e7a4c592b

USER root

# Update the system
RUN apk update

# Extract PHP source and install extensions
RUN apk add --no-cache \
    git \
    openrc \
    supervisor \
    libpq-dev \
    libzip-dev \
    curl \
    openjdk21

# Set the timezone
ENV TZ=UTC+1
RUN apk add --no-cache tzdata && ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Club application installation
RUN git clone https://github.com/SteveHoareau18/send.me.git /home/back

RUN mkdir /usr/tmp
RUN cd /usr/tmp/


# Set the working directory
WORKDIR /home/back

EXPOSE 8000