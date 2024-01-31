FROM node:latest as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
CMD [ "npm","run","dev" ]