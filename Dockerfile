FROM node:10.16.0-alpine as builder

RUN apk update
RUN apk add --no-cache \
    build-base bash python linux-headers zlib-dev

RUN mkdir -p /root/src/fe
WORKDIR /root/src/fe
ENV PATH /root/src/fe/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

FROM node:10.16.0-alpine

RUN apk update
RUN apk add --no-cache \
    build-base bash python linux-headers zlib-dev

WORKDIR /root/src/fe
ENV PATH /root/fe/app/node_modules/.bin:$PATH

COPY --from=builder /root/src/app/package.json /root/src/app/package.json
COPY --from=builder /root/src/app/yarn.lock /root/src/app/yarn.lock

RUN yarn install

COPY --from=builder /root/src/fe/dist /root/src/fe/dist

EXPOSE 3000

ENTRYPOINT ["node","./dist/app.js"]