FROM node:20-alpine AS development
WORKDIR /web
COPY package.json /web/package.json
COPY package-lock.json /web/package-lock.json
RUN npm install
COPY . /web
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
