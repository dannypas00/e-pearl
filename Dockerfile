FROM node:22

WORKDIR /app
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

COPY . /app

RUN set -eux; npm ci

RUN set -eux; npm run build

CMD ["node", ".output/server/index.mjs"]
