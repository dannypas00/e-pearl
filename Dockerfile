FROM node:22

COPY . /app

WORKDIR /app

RUN set -eux; \
    npm ci; \
    npm run build;