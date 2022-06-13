FROM node:16.14-alpine

RUN apk add --update --no-cache git

WORKDIR /workspace

COPY package.json yarn.lock /workspace/

RUN yarn

COPY . .

ENV DISABLE_ERD=true

RUN yarn build

CMD ["yarn", "start"]
