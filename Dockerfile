FROM node:16-slim

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]