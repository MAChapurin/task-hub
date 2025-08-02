FROM node:20-alpine

WORKDIR /app

ARG REDIS_URL
ENV REDIS_URL=$REDIS_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
