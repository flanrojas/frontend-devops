# 1- Build stage
FROM node:22.22.3-alpine3.23 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_VENTAS_API_URL
ARG VITE_DESPACHOS_API_URL
ENV VITE_VENTAS_API_URL=${VITE_VENTAS_API_URL}
ENV VITE_DESPACHOS_API_URL=${VITE_DESPACHOS_API_URL}
RUN npm run build

# 2- Runtime stage nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
