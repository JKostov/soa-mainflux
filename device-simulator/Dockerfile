FROM node:latest


RUN mkdir -p /app/src
WORKDIR /app

RUN apt-get update && apt-get install --yes bash build-essential python
ADD . /app

RUN npm install
RUN npm install -g nodemon

CMD ["node", "index.js"]
