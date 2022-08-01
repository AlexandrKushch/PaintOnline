
FROM node:alpine
RUN mkdir -p /home/app/src/client/public
RUN mkdir -p /home/app/src/client/src
WORKDIR /home/app/src/client
COPY package.json .
RUN npm install
COPY public /home/app/src/client/public
COPY src /home/app/src/client/src
EXPOSE 3000
CMD ["npm", "start"]
