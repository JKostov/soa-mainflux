FROM node:latest

RUN mkdir -p /app/src
RUN apt-get update
RUN apt-get install --yes bash

WORKDIR /app

COPY . /app/
RUN npm ci --silent

EXPOSE 1233
EXPOSE 1234
CMD ["npm", "run", "start:dev"]
