FROM node:18-alpine3.15 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --only=development

COPY . .

RUN yarn build

FROM node:18-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]