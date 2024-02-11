FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN cd backend && yarn --frozen-lockfile && yarn run build
RUN cd frontend && yarn --frozen-lockfile && yarn run codegen && yarn run build

FROM node:18-alpine as prod

RUN adduser --disabled-password --gecos "" appuser
RUN mkdir /app && chown -R appuser /app
WORKDIR /app
USER appuser

COPY --from=builder /app/frontend/dist frontend/
COPY --from=builder /app/backend/dist dist
COPY --from=builder /app/backend/node_modules node_modules

CMD ["node", "node_modules/typeorm/cli", "migration:run", "-d", "./dist/typeorm.js", ";", "node", "dist/main.js"]