FROM node:18.11.0-slim

WORKDIR /app

COPY /client/ /app/client/
COPY /server/package*.json /app/server/
RUN cd /app/server && npm install
COPY /server /app/server
RUN cd /app/server && npm run build

EXPOSE 3000
CMD cd /app/server && node index.js
