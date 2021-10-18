FROM node:16.11.1
WORKDIR /home/node/app

ENV PATH /app/node_modules/.bin:$PATH
COPY *.json ./
RUN npm install

COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]