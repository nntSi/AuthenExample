# Pull the base image
FROM node:18.16.0-alpine

# Set The Work Dir
WORKDIR /usr/app/frontend

# Copy app dependencies to container
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy code from host to container
COPY . .

# EXPOSE Port
EXPOSE 80

# Deploy app for local development
CMD ["npm", "run", "dev"]