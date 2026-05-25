# 1- Build stage
FROM node:22.22.3-alpine3.23 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ARG API_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV API_URL=${API_URL}
RUN npm run build

# 2- Runtime stage nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
