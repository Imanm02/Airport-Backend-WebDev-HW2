FROM express:1.16-alpine
WORKDIR /ticket
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]