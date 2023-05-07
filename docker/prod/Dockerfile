# STAGE 1
FROM node:18.10.0-alpine3.16 as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm config set unsafe-perm true

RUN npm install

COPY --chown=node:node . .

RUN npm run clean

# STAGE 2
FROM node:18.10.0-alpine3.16

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci --omit=dev


COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/src/helpers/email/templates/*.hbs ./dist/helpers/email/templates/

EXPOSE 3000

ENV NODE_ENV=production

USER node

CMD [ "node", "dist/app.js" ]