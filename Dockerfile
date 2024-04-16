FROM node:18.20.0-alpine3.19

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn build

EXPOSE 3000/tcp

CMD ["node", "./dist/angular-moviedb/server/server.mjs"]
