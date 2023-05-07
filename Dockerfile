FROM node:18.10.0-alpine3.16

RUN mkdir -p /node/app/node_modules && chown -R node:node /node/app

WORKDIR /node/app

COPY ["package.json", "package-lock.json", "/node/app/"]

RUN npm install

COPY [".", "/node/app/"]

USER node

EXPOSE 5050

ENV NODE_ENV='development'

CMD [ "npm", "run", "dev" ]