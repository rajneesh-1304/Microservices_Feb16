FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 3002

CMD [ "npm", "run", "start:dev" ]