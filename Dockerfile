FROM node:20 AS builder

RUN npm install -g expo-cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN expo build:web || expo export:web

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/web-build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
