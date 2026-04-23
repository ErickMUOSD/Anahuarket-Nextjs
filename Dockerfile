FROM node:20-alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
COPY .env.example .env

ENV NODE_ENV=local
ENV PORT=3000
ENV HOST=0.0.0.0

ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DATABASE_URL

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV DATABASE_URL=$DATABASE_URL
COPY prisma ./prisma/

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
