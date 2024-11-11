# Dockerfile for verification service

FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define environment variable
ENV NODE_ENV production

# Run the app
CMD [ "node", "src/server.js" ]
