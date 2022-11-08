FROM node:16-slim

RUN npm install -g @nestjs/cli@9.1.5

USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "tail -f /dev/null" ]