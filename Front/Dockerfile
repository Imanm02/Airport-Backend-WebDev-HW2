FROM node:16-alpine

WORKDIR /front
COPY package*.json ./
RUN yarn install

COPY . .
ENV PORT 5000
EXPOSE 5000
# Start the app
CMD [ "yarn", "start" ]