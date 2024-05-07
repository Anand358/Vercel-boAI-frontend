# Use an official Node runtime as the base image
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React project using Vite
# RUN npm run build

# Expose port 80 to the outside world
EXPOSE 8080

# Command to run Nginx in the foreground
CMD ["npm", "run", "dev", "--", "--host","0.0.0.0","--port", "8080"]
