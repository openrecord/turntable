FROM node:10
MAINTAINER <chasdeveas@gmail.com>

# Create our core app & src folders
RUN mkdir /app
WORKDIR /app

# Copy over package.json so we can later run npm install
COPY ./package.json package.json

# Install ALL dependencies
RUN npm install --loglevel warn --no-progress

# Copy over all of our code - note for local dev we'll mount over this from docker-compose
# DO THIS AFTER npm install so we get benefits of caching for npm install which takes a while
COPY ./config config
COPY ./src/app src/app
COPY ./bin bin
COPY ./serverless.yml serverless.yml

EXPOSE 7001

# Start the server
CMD npm start