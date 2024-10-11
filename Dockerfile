FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["sh", "-c", "npm run migrate && npm run start"]
#CMD npm migrate && npm start
#CMD ["npm", "start"]