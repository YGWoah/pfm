# Use the official Bun image
FROM oven/bun:1 as base

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN bun install

# Copy prisma schema and generate client
COPY prisma ./prisma/
RUN bunx prisma generate

# Copy the rest of the application
COPY . .

EXPOSE 8080

# Command to run the application
CMD ["bun", "bin/www.ts"]