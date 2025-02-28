FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the Docker image.
# This is done before copying the entire app to take advantage of cached Docker layers.
COPY package*.json ./

# Install production dependencies.
RUN npm install

EXPOSE $PORT

# Copy the local code to the container's workspace.
COPY . .

# Run the server when the container starts.
CMD ["node", "server.js"]