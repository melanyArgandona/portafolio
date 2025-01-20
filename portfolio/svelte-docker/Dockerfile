FROM node:16-alpine
WORKDIR /app
COPY ./build ./src
COPY ./package.json ./package.json
RUN npm install --production
CMD ["node", "./src/index.js"]
EXPOSE 3000