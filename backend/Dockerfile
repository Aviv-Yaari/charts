FROM node:16.13.0-alpine

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm","start"]