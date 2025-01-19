FROM node:20-alpine


WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 7070

CMD ["node","index.js"]