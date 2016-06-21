FROM node:4.2.2

# Directories
RUN mkdir -p /opt/nodejs/public
WORKDIR /opt/nodejs

# Install Bower & Grunt
RUN npm install -g bower grunt-cli && \
    echo '{ "allow_root": true }' > /root/.bowerrc

ADD ["./Gruntfile.js", "/opt/nodejs/"]
ADD ["./LICENSE.txt", "/opt/nodejs/"]
ADD ["./build", "/opt/nodejs/build/"]
ADD ["./map-journal-help-application-id.png", "/opt/nodejs/map-journal-help-application-id.png"]
ADD ["./map-journal-storytelling-template-js.png", "/opt/nodejs/map-journal-storytelling-template-js.png"]
ADD ["./package.json", "/opt/nodejs/"]
ADD ["./node_modules", "/opt/nodejs/node_modules/"]
ADD ["./src", "/opt/nodejs/src/"]

ENV NODE_ENV production
EXPOSE 8080 35729
CMD grunt server 2>&1
