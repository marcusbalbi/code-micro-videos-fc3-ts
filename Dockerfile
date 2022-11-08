FROM node:16-slim

RUN apt update && apt install -y \
  git \
  ca-certificates \
  openjdk-11-jre \
  zsh \
  curl \
  wget \
  fonts-powerline \
  procps

RUN npm install -g @nestjs/cli@9.1.5

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "tail -f /dev/null" ]