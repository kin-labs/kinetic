FROM node:16.14-alpine

RUN apk add --update --no-cache git

ENV DISABLE_ERD=true
ENV HUSKY=0

WORKDIR /workspace

COPY package.json yarn.lock /workspace/

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]
