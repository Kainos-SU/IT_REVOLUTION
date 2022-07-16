FROM node:12.22-alpine

ENV HOST 0.0.0.0

WORKDIR /app
COPY . .

RUN apk --no-cache add git && npm install && npm run build && npm run generate

EXPOSE 3000
CMD [ "npm", "start" ]