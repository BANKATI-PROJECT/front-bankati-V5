# Stage 1: Build the Angular app
FROM node:20-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Run npm build (without BuildKit caching for now)
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built app to nginx html directory
COPY --from=builder /app/dist/bankati-front/browser /usr/share/nginx/html

EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
