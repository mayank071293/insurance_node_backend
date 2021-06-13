FROM node:13

#args
ARG POSTGRES_USERNAME
ENV POSTGRES_USERNAME=$POSTGRES_USERNAME
ARG DB_USERNAME
ENV DB_USERNAME=$DB_USERNAME
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
ARG DB_HOST
ENV DB_HOST=$DB_HOST
ARG DB_DB
ENV DB_DB=$DB_DB
ARG PORT
ENV PORT=$PORT
ARG HOST
ENV HOST=$HOST
ARG ENV
ENV ENV=$ENV

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "npm","start"]