FROM node:14-alpine3.15 as builder
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build

FROM node:14-alpine3.15 as runner
COPY --from=builder /app/build /app
CMD ["npx", "http-server", "/app", "-p", "80"]