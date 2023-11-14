FROM node:18-alpine as builder

WORKDIR /app

COPY ./package.json .

RUN yarn

COPY . .

RUN yarn build

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /app .

EXPOSE 9000

CMD [ "yarn","start" ]