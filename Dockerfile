FROM node:4.2.2

# Directories
RUN mkdir -p /opt/nodejs/public
WORKDIR /opt/nodejs

ADD ["./Gruntfile.js", "/opt/nodejs/"]
ADD ["./package.json", "/opt/nodejs/"]
ADD ["./node_modules", "/opt/nodejs/node_modules/"]
ADD ["./src", "/opt/nodejs/src/"]

ENV NODE_ENV production
EXPOSE 8080 35729
CMD grunt server 2>&1
