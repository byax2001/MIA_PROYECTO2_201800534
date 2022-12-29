FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD [ "npm","start" ]
#http://3.87.223.203:3000/