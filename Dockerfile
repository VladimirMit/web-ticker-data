FROM node:alpine as build

WORKDIR /src

COPY . ./

RUN npm install
RUN npm run build

FROM nginx as host

COPY --from=build /src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]