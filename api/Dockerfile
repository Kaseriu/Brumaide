FROM node:alpine3.15

USER root
WORKDIR /home/api

COPY package.json .

RUN yarn install

COPY . .

USER 1234
ENTRYPOINT [ "npm" ]
CMD ["run", "start-dev"]