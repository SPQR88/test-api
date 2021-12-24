FROM node:16-alpine

RUN mkdir -p /var/www && chown -R node:node /var/www
WORKDIR /var/www

USER  node

COPY package.json .
COPY tsconfig.json .
COPY .env .
RUN npm install

COPY --chown=node:node ./src ./src

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 8080
