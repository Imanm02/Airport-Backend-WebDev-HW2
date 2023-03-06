FROM node:16-alpine AS builder

WORKDIR /front
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build



FROM nginx:1.23-alpine AS server
ENV PORT 5000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./front/build /usr/share/nginx/html