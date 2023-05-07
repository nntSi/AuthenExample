# Pull the base image
FROM node:18.16.0-alpine

# Set The Work Dir
WORKDIR /usr/app/backend

# Copy app dependencies to container
COPY ./package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon

# Copy code from host to container
COPY . .

# EXPOSE Port
EXPOSE 3002

# Deploy app for local development
CMD ["nodemon", "server.js"]