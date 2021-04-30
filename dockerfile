FROM node:14.16.0-alpine as builder

RUN apk add --no-cache yarn

WORKDIR /app

COPY ./ui/package.json ./package.json
COPY ./ui/yarn.lock ./yarn.lock
RUN yarn

COPY ./ui/src ./src
COPY ./ui/public ./public
COPY ./ui/tsconfig.json ./tsconfig.json
RUN yarn build


FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/mime.types /etc/nginx/mime.types
COPY --from=builder /app/build /static/app