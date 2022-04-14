# Node.js
Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.

#Express.js Express is a fast, assertive, essential and moderate web framework of Node.js. You can assume express as a layer built on the top of the Node.js that helps manage a server and routes. It provides a robust set of features to develop web and mobile applications.

Let's see some of the core features of Express framework:

It can be used to design single-page, multi-page and hybrid web applications. It allows to setup middlewares to respond to HTTP Requests. It defines a routing table which is used to perform different actions based on HTTP method and URL. It allows to dynamically render HTML Pages based on passing arguments to templates. Why use Express? -Ultra fast I/O -Asynchronous and single threaded -MVC like structure -Robust API makes routing easy -How does Express look like

File: basic_express.js

var express = require('express');
var app = express();
app.get('/', function (req, res) {
res.send('Welcome to JavaTpoint!');
});
var server = app.listen(8000, function () {
var host = server.address().address;
var port = server.address().port;
console.log('Example app listening at http://%s:%s', host, port);
});

#Redis Caching Redis is an open source (BSD licensed), in-memory data structure store used as a database, cache, message broker, and streaming engine. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

Redis also includes: -Transactions -Pub/Sub -Lua scripting -Keys with a limited time-to-live -LRU eviction of keys -Automatic failover

A basic implementation of Redis can be visualised as: const redis = require("redis"); const client = createClient({ host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT), password: process.env.REDIS_PASSWORD })

client.on("error", function(error) { console.error(error); });

client.set("key", "value", redis.print); client.get("key", redis.print);

#Docker Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.

The Docker platform Docker provides the ability to package and run an application in a loosely isolated environment called a container. The isolation and security allows you to run many containers simultaneously on a given host. Containers are lightweight and contain everything needed to run the application, so you do not need to rely on what is currently installed on the host. You can easily share containers while you work, and be sure that everyone you share with gets the same container that works in the same way.

Docker provides tooling and a platform to manage the lifecycle of your containers:

Develop your application and its supporting components using containers. The container becomes the unit for distributing and testing your application. When you’re ready, deploy your application into your production environment, as a container or an orchestrated service. This works the same whether your production environment is a local data center, a cloud provider, or a hybrid of the two. Build the app’s container image In order to build the application, we need to use a Dockerfile. A Dockerfile is simply a text-based script of instructions that is used to create a container image. If you’ve created Dockerfiles before, you might see a few flaws in the Dockerfile below. But, don’t worry. We’ll go over them.

Create a file named Dockerfile in the same folder as the file package.json with the following contents.

syntax=docker/dockerfile:1
FROM node:12-alpine RUN apk add --no-cache python2 g++ make WORKDIR /app COPY . . RUN yarn install --production CMD ["node", "src/index.js"] EXPOSE 3000 Please check that the file Dockerfile has no file extension like .txt. Some editors may append this file extension automatically and this would result in an error in the next step.

If you haven’t already done so, open a terminal and go to the app directory with the Dockerfile. Now build the container image using the docker build command.

docker build -t getting-started .

This command used the Dockerfile to build a new container image. You might have noticed that a lot of “layers” were downloaded. This is because we instructed the builder that we wanted to start from the node:12-alpine image. But, since we didn’t have that on our machine, that image needed to be downloaded.

After the image was downloaded, we copied in our application and used yarn to install our application’s dependencies. The CMD directive specifies the default command to run when starting a container from this image.

Finally, the -t flag tags our image. Think of this simply as a human-readable name for the final image. Since we named the image getting-started, we can refer to that image when we run a container.

The . at the end of the docker build command tells that Docker should look for the Dockerfile in the current directory.

Start an app container Now that we have an image, let’s run the application. To do so, we will use the docker run command (remember that from earlier?).

Start your container using the docker run command and specify the name of the image we just created:

docker run -dp 3000:3000 getting-started

Remember the -d and -p flags? We’re running the new container in “detached” mode (in the background) and creating a mapping between the host’s port 3000 to the container’s port 3000. Without the port mapping, we wouldn’t be able to access the application.

After a few seconds, open your web browser to http://localhost:3000. You should see our app.

#Docker Compose The Compose application model The Compose specification allows one to define a platform-agnostic container based application. Such an application is designed as a set of containers which have to both run together with adequate shared resources and communication channels.

Computing components of an application are defined as Services. A Service is an abstract concept implemented on platforms by running the same container image (and configuration) one or more times.

Services communicate with each other through Networks. In this specification, a Network is a platform capability abstraction to establish an IP route between containers within services connected together. Low-level, platform-specific networking options are grouped into the Network definition and MAY be partially implemented on some platforms.

Services store and share persistent data into Volumes. The specification describes such a persistent data as a high-level filesystem mount with global options. Actual platform-specific implementation details are grouped into the Volumes definition and MAY be partially implemented on some platforms.

Some services require configuration data that is dependent on the runtime or platform. For this, the specification defines a dedicated concept: Configs. From a Service container point of view, Configs are comparable to Volumes, in that they are files mounted into the container. But the actual definition involves distinct platform resources and services, which are abstracted by this type.

A Secret is a specific flavor of configuration data for sensitive data that SHOULD NOT be exposed without security considerations. Secrets are made available to services as files mounted into their containers, but the platform-specific resources to provide sensitive data are specific enough to deserve a distinct concept and definition within the Compose specification.

Distinction within Volumes, Configs and Secret allows implementations to offer a comparable abstraction at service level, but cover the specific configuration of adequate platform resources for well identified data usages.

A Project is an individual deployment of an application specification on a platform. A project’s name is used to group resources together and isolate them from other applications or other installation of the same Compose specified application with distinct parameters. A Compose implementation creating resources on a platform MUST prefix resource names by project and set the label com.docker.compose.project.

Project name can be set explicitly by top-level name attribute. Compose implementation MUST offer a way for user to set a custom project name and override this name, so that the same compose.yaml file can be deployed twice on the same infrastructure, without changes, by just passing a distinct name.

Consider an application split into a frontend web application and a backend service.

The frontend is configured at runtime with an HTTP configuration file managed by infrastructure, providing an external domain name, and an HTTPS server certificate injected by the platform’s secured secret store.

The backend stores data in a persistent volume.

Both services communicate with each other on an isolated back-tier network, while frontend is also connected to a front-tier network and exposes port 443 for external usage.

dc

The example application is composed of the following parts:

2 services, backed by Docker images: webapp and database 1 secret (HTTPS certificate), injected into the frontend 1 configuration (HTTP), injected into the frontend 1 persistent volume, attached to the backend 2 networks services: frontend: image: awesome/webapp ports: - "443:8043" networks: - front-tier - back-tier configs: - httpd-config secrets: - server-certificate

backend: image: awesome/database volumes: - db-data:/etc/data networks: - back-tier

volumes: db-data: driver: flocker driver_opts: size: "10GiB"

configs: httpd-config: external: true

secrets: server-certificate: external: true

networks:

The presence of these objects is sufficient to define them
front-tier: {} back-tier: {}
