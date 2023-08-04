# The builder from node image
FROM node:16-alpine as builder
RUN apk update && apk add --no-cache make git
RUN npm install @ionic/cli -g

# Move our files into directory name "app"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . ./
RUN ionic build --prod

# Build a small nginx image with static website
FROM nginx:1.17-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/www/ /usr/share/nginx/html/
COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
